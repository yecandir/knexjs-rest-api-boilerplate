import './types';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
config();
import knex from './knex/knex';

const port = process.env.PORT ?? 3000;

const app = express();
app.use(express.json({ limit: '5MB' }));
app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
	res.send('App is running. Health check endpoint');
});

app.get('/users', async (req, res) => {
	const values = await knex.from('users').select();
	res.json(values);
});

app.listen(port, () => console.log(`Listening on port ${port}.`));
