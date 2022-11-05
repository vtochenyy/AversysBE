import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';
import { UserService } from './users.service';

export class UsersController extends BaseController {
	DBSchema: any;
	userService: UserService;
	constructor(logger: LoggerService, DBSchema: {}) {
		super(logger);
		this.DBSchema = DBSchema;
		this.userService = new UserService();
		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				path: '/all',
				method: 'get',
				func: async (req, res, next) => {
					const users = await this.DBSchema.User.findAll();
					res.status(200).send(users);
				},
			},
			{
				path: '/create',
				method: 'post',
				func: async (req, res, next) => {
					if (!!req.body.firstName && !!req.body.lastName && !!req.body.age) {
						try {
							let result = await this.userService.createRecord.bind(this.userService)(
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
				path: '/findById',
				method: 'post',
				func: async (req, res, next) => {
					if (!!req.body.id) {
						try {
							let result = await this.userService.getUserById.bind(this.userService)(
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
