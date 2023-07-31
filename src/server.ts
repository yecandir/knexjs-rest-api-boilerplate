import express from 'express';
import helmet from 'helmet';
import { loadControllers, scopePerRequest } from 'awilix-express';
import { container } from './bootstrap/container';
import { customCors } from './utils/config';

const app = express();

app.use(scopePerRequest(container));
app.use(express.json({ limit: '5MB' }));
app.use(customCors);
app.use(helmet());

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));
app.use(loadControllers('controllers/*.js', { cwd: __dirname }));

app.get('/', (req, res) => {
	res.send('App is running.');
});

export { app };
