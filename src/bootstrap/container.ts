import { Lifetime, asValue, createContainer } from 'awilix';
import knex from './knex/knex';
import { Knex } from 'knex';
import UsersService from '../services/users.service';
import UsersController from '../server/controllers/users.controller';

export interface ContainerDependencies {
	knex: Knex;
	usersService: UsersService;
	usersController: UsersController;
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

container.loadModules(
	['../server/controllers/*.ts', '../server/controllers/*.ts'],
	{
		cwd: __dirname,
		formatName: 'camelCase',
		resolverOptions: {
			lifetime: Lifetime.SCOPED,
		},
	}
);

export { container };
