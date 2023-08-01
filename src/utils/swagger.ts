import { Application } from 'express';
import routeConfigs from '../server/routes';
import swaggerUi from 'swagger-ui-express';
import { pathToRegexp, Key } from 'path-to-regexp';
import joiToJson from 'joi-to-json';
import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paths: { [key: string]: any } = {};

type SwaggerRouteParamIn = 'path' | 'query' | 'body';

interface SwaggerRouteParameters {
	name: string;
	description?: string;
	schema: {
		description?: string;
		type: string;
	};
	in: SwaggerRouteParamIn;
}

const genarateParams = (
	joiObject: Joi.ObjectSchema | undefined,
	inParam: SwaggerRouteParamIn
) => {
	const parameters: SwaggerRouteParameters[] = [];
	if (joiObject) {
		const json = joiToJson(joiObject);
		const propertyKeys = Object.keys(json.properties);
		propertyKeys.forEach((pKey) => {
			parameters.push({
				name: pKey,
				in: inParam,
				schema: {
					type: json?.properties[pKey].type,
				},
			});
		});
	}
	return parameters;
};

routeConfigs.map((route) => {
	const keys: Key[] = [];
	const routePath = route.path;
	pathToRegexp(routePath, keys);
	let convertedPath = routePath;
	keys.forEach((key) => {
		convertedPath = convertedPath.replace(
			`:${key.name}`,
			`{${key.name}}`
		);
	});

	const parameters: SwaggerRouteParameters[] = [];

	const request = route.config.validation.request ?? {};

	parameters.push(
		...genarateParams(request?.params, 'path'),
		...genarateParams(request?.query, 'query'),
		...genarateParams(request?.body, 'body')
	);

	paths[convertedPath] = {
		[`${route.method}`]: {
			summary: `${route.method.toUpperCase()} ${convertedPath}`,
			definition: `${route.config.description}`,
			responses: {},
			parameters: parameters,
		},
	};
});

const swaggerJson: swaggerUi.JsonObject = {
	openapi: '3.0.3',
	info: {
		title: 'Rest API Documentation',
		description: 'Rest API documentation for developer use',
		version: '0.0.1',
	},
	paths,
};

const setupSwagger = (app: Application) => {
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
};

export default setupSwagger;
