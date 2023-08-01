import { RouteConfigInterface } from './types';
import { container } from '../../bootstrap/container';

const routeConfig: RouteConfigInterface[] = [
	{
		path: '/users/test',
		method: 'get',
		config: {
			tags: ['api'],
			description: 'test endpoint',
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		handler: async (req: any, res: any) => {
			const usersController = container.resolve('usersController');
			await usersController.getUser(req, res);
		},
	},
];

export default routeConfig;
