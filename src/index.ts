import './types';
import { config } from 'dotenv';
import { app } from './server';
config();

const port = process.env.PORT ?? 3010;
app.listen(port, () => console.log(`Listening on port ${port}.`));
