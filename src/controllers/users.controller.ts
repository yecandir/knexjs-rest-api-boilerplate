import bodyParser from 'body-parser';
import { route, GET, POST, before } from 'awilix-express'; // or `awilix-router-core`
import { Request, Response } from 'express';
import UserService from '../services/user.service';

@route('/users')
export default class UserController {
	private userService: UserService;

	constructor(deps: { userService: UserService }) {
		this.userService = deps.userService;
	}

	@route('/:id')
	@GET()
	async getUser(req: Request, res: Response) {
		const id = req.params.id;
		await this.userService.getUsers();
		res.send(id);
	}

	@POST()
	@before([bodyParser.json()])
	async createUser(req: Request, res: Response) {
		const id = req.body;
		res.send(id);
	}
}
