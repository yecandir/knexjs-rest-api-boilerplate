import { Request, Response, NextFunction } from 'express';
import routeConfigs from '../routes';
import { RouteSettings, validatorKey } from '../../types';
import { Key, pathToRegexp } from 'path-to-regexp';

export interface LoggerService {
	name: string;
}

export default function ValidationMiddleware(deps?: {
	logger: LoggerService;
}): (req: Request, res: Response, next: NextFunction) => void {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log(deps?.logger.name);
		const route = isRouteExist(req);

		if (!route) {
			res.status(404).send('Not Found');
			return;
		}

		/**
		 * Right now, not able to get req.params
		 * there is some configuration error going on
		 * but no problem implemented a work-around here
		 */
		const params = extractParams(
			route.path.split('/'),
			req.path.split('/')
		);

		const errorMessages: string[] = [];
		const validation = route.config.validation.request ?? {};
		const keys = Object.keys(validation ?? {}) as validatorKey[];

		keys.forEach((key: validatorKey) => {
			let result;
			if (key == 'params') {
				result = validation[key]?.validate(params);
			} else {
				result = validation[key]?.validate(req[key]);
			}
			const details = result?.error?.details;
			if (details && details.length > 0) {
				errorMessages.push(`${key}: ${details[0].message}`);
			}
		});

		if (errorMessages.length > 0) {
			res.status(400).json(errorMessages);
			return;
		}

		next();
	};
}

function isRouteExist(req: Request): RouteSettings | undefined {
	const method = req.method.toLowerCase();
	const requestPath = req.path;

	// Iterate through the routeConfigs and check if the request matches any route
	for (const route of routeConfigs) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const keys: Key[] = [];
		const pattern = pathToRegexp(route.path, keys);
		const match = pattern.exec(requestPath);
		if (match && route.method === method) {
			return { ...route };
		}
	}

	return undefined; // No matching route found
}

function extractParams(a1: string[], a2: string[]) {
	const result: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = {};

	for (let i = 0; i < a1.length; i++) {
		if (a1[i].startsWith(':')) {
			const paramName = a1[i].slice(1); // Remove the ':' from the parameter name
			const paramValue = a2[i];
			result[paramName] = paramValue;
		}
	}

	return result;
}
