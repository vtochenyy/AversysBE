import { BaseController } from '../common/base.controller';
import { HttpError } from '../errors/http-error.class';
import { LoggerService } from '../logger/logger.service';
import { OrganizationService } from './organization.service';

export class OrganizationsController extends BaseController {
	DBSchema: any;
	organzationsService: OrganizationService;

	constructor(
		logger: LoggerService,
		DBSchema: {},
		organzationsService: OrganizationService
	) {
		super(logger);
		this.DBSchema = DBSchema;
		this.organzationsService = organzationsService;
		this.bindUserAPI();
	}
	public bindUserAPI() {
		this.bindRoutes([
			{
				root: '/org',
				path: '/create',
				method: 'post',
				func: async (req, res, next) => {
					if (
						!!req.body.organizationName &&
						!!req.body.organizationAbbr &&
						!!req.body.organizationType
					) {
						try {
							const users = await this.organzationsService.createRecord.bind(
								this.organzationsService
							)(
								req.body,
								this.DBSchema.Organization,
								this.DBSchema.OrganizationToExpenses,
								next
							);
							!!users && res.status(200).send(users);
						} catch (error) {
							next(new HttpError(500, 'Ошибка обработки запроса', '/org/create'));
						}
					} else {
						next(new HttpError(500, 'Ошибка структуры тела запроса', '/org/create'));
					}
				},
			},
			{
				root: '/org',
				path: '/all',
				method: 'get',
				func: async (req, res, next) => {
					try {
						const users = await this.organzationsService.findAll.bind(this.organzationsService)(
							this.DBSchema.Organization,
							next
						);
						!!users && res.status(200).send(users);
					} catch (error) {
						next(new HttpError(500, 'Ошибка обработки запроса', '/org/create'));
					}
				},
			},
			{
				root: '/org',
				path: '/findByParams',
				method: 'post',
				func: async (req, res, next) => {
					try {
						const users = await this.organzationsService.findByParams.bind(
							this.organzationsService
						)(req.body, this.DBSchema.Organization, next);
						!!users && res.status(200).send(users);
					} catch (error) {
						next(new HttpError(500, 'Ошибка обработки запроса', '/org/create'));
					}
				},
			},
		]);
	}
}
