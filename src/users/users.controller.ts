import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';

export class UsersController extends BaseController {
	DBSchema: any;
	constructor(logger: LoggerService, DBSchema: {}) {
		super(logger);
		this.DBSchema = DBSchema;
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
				path: '/testUser',
				method: 'post',
				func: async (req, res, next) => {
					try {
						const user = await this.DBSchema.User.create({
							firstName: 'Test',
							lastName: 'Testovich',
							age: 12,
						});
						res.status(200).send({ id: user.id });
					} catch (error) {
						new HttpError(500, 'Ошибка обработки запроса', '/testUser');
					}
				},
			},
		]);
	}
}
