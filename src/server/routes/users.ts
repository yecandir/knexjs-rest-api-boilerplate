import { Response, Request } from 'express';
import { container } from '../../bootstrap/container';
import { RouteSettings } from '../../types';
import userRouteValidations from '../validations/users';

const routeConfig: RouteSettings[] = [
	{
		path: '/users/test/:id',
		method: 'get',
		config: {
			tags: ['api'],
			description: 'test endpoint',
			validation: userRouteValidations.test,
		},
		handler: async (req: Request, res: Response) => {
			const usersController = container.resolve('usersController');
			await usersController.getUser(req, res);
		},
	},

	{
		path: '/users/test/:id',
		method: 'put',
		config: {
			tags: ['api'],
			description: 'test endpoint',
			validation: userRouteValidations.test,
		},
		handler: async (req: Request, res: Response) => {
			const usersController = container.resolve('usersController');
			await usersController.getUser(req, res);
		},
	},
];

export default routeConfig;
