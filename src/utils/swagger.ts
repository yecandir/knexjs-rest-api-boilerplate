import { Application } from 'express';
import routeConfigs from '../server/routes';
import swaggerUi from 'swagger-ui-express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const paths: { [key: string]: any } = {};

routeConfigs.map((route) => {
	paths[route.path] = {
		[`${route.method}`]: {
			summary: `${route.method.toUpperCase()} ${route.path}`,
			definition: `${route.config.description}`,
			responses: {},
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
