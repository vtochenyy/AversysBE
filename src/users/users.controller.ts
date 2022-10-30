import { BaseController } from '../common/base.controller';
import { Express } from 'express';
import { LoggerService } from '../logger/logger.service';

export class UsersController extends BaseController {
	constructor(logger: LoggerService, app: Express) {
		super(logger);
		app.use('/users', this.router);
		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				path: '/all',
				method: 'get',
				func: (req, res, next) => {
					res.status(200).send(['Vasya', 'Adam']);
				},
			},
		]);
	}
}
