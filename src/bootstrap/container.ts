import { Lifetime, asValue, createContainer } from 'awilix';
import knex from './knex/knex';
import { Knex } from 'knex';
import UserService from '../services/user.service';

export interface ContainerDependencies {
	knex: Knex;
	userService: UserService;
}

const container = createContainer<ContainerDependencies>();

container.register('knex', asValue(knex));

container.loadModules(['../services/*.ts', '../services/*.js'], {
	cwd: __dirname,
	formatName: 'camelCase',
	resolverOptions: {
		lifetime: Lifetime.SCOPED,
	},
});

export { container };
