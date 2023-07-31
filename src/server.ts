import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { loadControllers, scopePerRequest } from 'awilix-express';
import { container } from './bootstrap/container';
config();

const app = express();

app.use(scopePerRequest(container));
app.use(express.json({ limit: '5MB' }));
app.use(cors());
app.use(helmet());

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));
app.use(loadControllers('controllers/*.js', { cwd: __dirname }));

app.get('/', (req, res) => {
	res.send('App is running.');
});

export { app };
