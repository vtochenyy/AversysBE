import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { UserService } from './users.service';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController {
	DBSchema: any;
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UsersService) private userService: UserService
	) {
		super(loggerService);
		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				root: '/users',
				path: '/all',
				method: 'get',
				func: async (req, res, next) => {},
			},
			{
				root: '/users',
				path: '/register',
				method: 'post',
				func: this.register,
			},
			{
				root: '/users',
				path: '/login',
				method: 'post',
				func: async (req, res, next) => {},
			},
			{
				root: '/users',
				path: '/logout',
				method: 'post',
				func: async (req, res, next) => {},
			},
			{
				root: '/users',
				path: '/findById',
				method: 'post',
				func: async (req, res, next) => {},
			},
		]);
	}

	async register(req: Request, res: Response, next: NextFunction) {
		try {
			if (!!req.body.login && !!req.body.password) {
				let user = await this.userService.createRecord(req.body, next);
				res.status(201).send(user);
			} else {
				throw new Error();
			}
		} catch (err) {
			this.loggerService.err(err);
			next(new HttpError(400, 'Неверно сформирован запрос', 'UsersController'));
		}
	}
}
