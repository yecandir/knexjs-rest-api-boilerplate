import { Knex } from 'knex';

export default class UsersService {
	private knex: Knex;
	constructor(deps: { knex: Knex }) {
		this.knex = deps.knex;
	}

	async getUsers() {
		const users = await this.knex.from('users').select();
		return users;
	}
}
