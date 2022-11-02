import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';

export class UsersController extends BaseController {
	constructor(logger: LoggerService) {
		super(logger);
		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				path: '/all',
				method: 'get',
				func: (req, res, next) => {
					res.status(200).send(['Vasya', 'Adam', 12]);
				},
			},
			{
				path: '/test',
				method: 'post',
				func: (req, res, next) => {
					next(new HttpError(401, 'test error msg', 'UserController'));
				},
			},
		]);
	}
}
