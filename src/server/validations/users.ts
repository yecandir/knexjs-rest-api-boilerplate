import Joi from 'joi';
import { RouteValidation } from '../../types';

const userRouteValidations: { [key: string]: RouteValidation } = {
	test: {
		request: {
			query: Joi.object().keys({
				name: Joi.string().required(),
				surname: Joi.string().required(),
			}),
			params: Joi.object().keys({ id: Joi.number().required() }),
		},
	},
};

export default userRouteValidations;
