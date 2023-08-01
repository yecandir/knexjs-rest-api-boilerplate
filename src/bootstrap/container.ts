import { Lifetime, asValue, createContainer } from 'awilix';
import knex from './knex/knex';
import { Knex } from 'knex';
import UsersService from '../services/users.service';
import UsersController from '../server/controllers/users.controller';
import ValidationMiddleware from '../server/middlewares/validation.middleware';

export interface ContainerDependencies {
	knex: Knex;
	usersService: UsersService;
	usersController: UsersController;
	validationMiddleware: typeof ValidationMiddleware;
}

const container = createContainer<ContainerDependencies>();

container.register('knex', asValue(knex));

container.register('logger', asValue({ name: 'Yunus' }));

container.loadModules(['../services/*.ts', '../services/*.js'], {
	cwd: __dirname,
	formatName: 'camelCase',
	resolverOptions: {
		lifetime: Lifetime.SCOPED,
	},
});

container.loadModules(
	['../server/controllers/*.ts', '../server/controllers/*.js'],
	{
		cwd: __dirname,
		formatName: 'camelCase',
		resolverOptions: {
			lifetime: Lifetime.SCOPED,
		},
	}
);

container.loadModules(
	['../server/middlewares/*.ts', '../server/controllers/*.js'],
	{
		cwd: __dirname,
		formatName: 'camelCase',
		resolverOptions: {
			lifetime: Lifetime.SCOPED,
		},
	}
);

export { container };
