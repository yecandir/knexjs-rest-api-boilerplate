import './types';
import app from './server';
import { config } from 'dotenv';
config();

const port = process.env.PORT ?? 3000;

app.listen(port, () => console.log(`Listening on port ${port}.`));
