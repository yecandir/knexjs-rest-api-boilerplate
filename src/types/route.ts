import Joi from 'joi';
import { RequestHandler } from 'express';

export interface RouteRequestValidation {
	params?: Joi.ObjectSchema;
	query?: Joi.ObjectSchema;
	body?: Joi.ObjectSchema;
	headers?: Joi.ObjectSchema;
}

export interface RouteValidation {
	request?: RouteRequestValidation;
	response?: Joi.ObjectSchema;
}

export type validatorKey = 'params' | 'query' | 'body' | 'headers';

export interface RouteSettings {
	path: string;
	method: HttpMethod;
	config: {
		tags: string[];
		description: string;
		validation: RouteValidation;
	};
	handler: RequestHandler;
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete';
