import knex from 'knex';
import knexConfig from './knexfile';
import { config } from 'dotenv';
config();

const _config =
	knexConfig[process.env.NODE_ENV] ?? knexConfig['local'];

export default knex(_config);
