import { Knex } from 'knex';
import path from 'path';

const defaults: Knex.Config = {
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
	},
	pool: {
		min: 2,
		max: 10,
	},
};

const local: Knex.Config = {
	client: 'sqlite3',
	connection: {
		filename: path.resolve(__dirname, './testDB.db'),
	},
	useNullAsDefault: true,
};

export default {
	local,
	dev: {
		...defaults,
		debug: true,
		useNullAsDefault: true,
	},
	prod: {
		...defaults,
	},
};
