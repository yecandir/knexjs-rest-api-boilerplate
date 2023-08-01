import Joi from 'joi';
import UserController from '../controllers/users.controller';
import { RequestHandler } from 'express';

export interface ControllerAsDependencies {
	userController: UserController;
}

export interface RouteConfigInterface {
	path: string;
	method: 'get' | 'post';
	config: {
		tags: string[];
		description: string;
		validate?: {
			requestSchema?: {
				param?: Joi.ObjectSchema;
				query?: Joi.ObjectSchema;
				body?: Joi.ObjectSchema;
			};
		};
		response?: Joi.ObjectSchema;
	};
	handler: RequestHandler;
}
