import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { UserService } from './users.service';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { InitDatabase } from '../db/InitDatabae.service';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController {
	DBSchema: any;
	constructor(
		@inject(TYPES.ILogger) loggerService: ILogger,
		@inject(TYPES.DataBase) DataBase: InitDatabase,
		@inject(TYPES.UserService) private UserService: UserService
	) {
		super(loggerService);
		this.DBSchema = DataBase.DBSchema;
		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				root: '/users',
				path: '/all',
				method: 'get',
				func: async (req, res, next) => {
					const users = await this.UserService.findAll.bind(this.UserService)(
						this.DBSchema.User,
						next
					);
					!!users && res.status(200).send(users);
				},
			},
			{
				root: '/users',
				path: '/create',
				method: 'post',
				func: async (req, res, next) => {
					if (
						!!req.body.firstName &&
						!!req.body.lastName &&
						!!req.body.login &&
						!!req.body.password
					) {
						try {
							let result = await this.UserService.createRecord.bind(this.UserService)(
								req.body,
								this.DBSchema.User,
								next
							);
							res.status(200).send(result);
						} catch (error) {
							next(new HttpError(500, 'Ошибка обработки запроса', '/testUser'));
						}
					} else {
						next(new HttpError(500, 'Ошибка структуры тела запроса', '/testUser'));
					}
				},
			},
			{
				root: '/users',
				path: '/findById',
				method: 'post',
				func: async (req, res, next) => {
					if (!!req.body.id) {
						try {
							let result = await this.UserService.getUserById.bind(this.UserService)(
								req.body.id,
								this.DBSchema.User,
								next
							);
							!!result && res.status(200).send(result);
						} catch (error) {
							next(new HttpError(500, 'Ошибка обработки запроса', '/testUser'));
						}
					} else {
						next(new HttpError(500, 'Ошибка структуры тела запроса', '/testUser'));
					}
				},
			},
		]);
	}
}
