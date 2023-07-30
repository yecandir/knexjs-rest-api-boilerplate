import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import knex from '../knex/knex';

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

export default app;
