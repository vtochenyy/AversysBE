import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { UserService } from './users.service';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController {
	DBSchema: any;
	constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
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
				func: async (req, res, next) => {},
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
}
