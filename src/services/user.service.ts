import { Knex } from 'knex';

export default class UserService {
	private knex: Knex;
	constructor(deps: { knex: Knex }) {
		this.knex = deps.knex;
	}

	async getUsers() {
		const users = await this.knex.from('users').select();
		return users;
	}
}
