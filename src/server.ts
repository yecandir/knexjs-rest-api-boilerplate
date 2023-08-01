import express from 'express';
import helmet from 'helmet';
import { customCors } from './utils/config';
import routeConfigs from './server/routes';
import setupSwagger from './utils/swagger';

const app = express();

app.use(express.json({ limit: '5MB' }));
app.use(customCors);
app.use(helmet());

// load swagger documentation
setupSwagger(app);

// load routes
routeConfigs.map((route) => {
	app[route.method](route.path, route.handler);
});

app.get('/', (req, res) => {
	res.send('App is running.');
});

export { app };
