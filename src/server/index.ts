import express from 'express';
import helmet from 'helmet';
import { customCors } from '../utils/config';
import routeConfigs from './routes';
import setupSwagger from '../utils/swagger';
import requestValidations from '../middlewares/validations';

const app = express();

app.use(express.json({ limit: '5MB' }));
app.use(customCors);
app.use(helmet());

app.get('/', (req, res) => {
	res.send('App is running.');
});

setupSwagger(app);
app.use(requestValidations);

// register routes
routeConfigs.map((route) => {
	app[route.method](route.path, route.handler);
});

export { app };
