import { Request, Response } from 'express';
import UsersService from '../../services/users.service';

export default class UsersController {
	private userService: UsersService;

	constructor(deps: { usersService: UsersService }) {
		this.userService = deps.usersService;
	}

	async getUser(req: Request, res: Response) {
		const id = req.params.id;
		await this.userService.getUsers();
		return res.send(id);
	}

	async createUser(req: Request, res: Response) {
		const id = req.body;
		return res.send(id);
	}
}
