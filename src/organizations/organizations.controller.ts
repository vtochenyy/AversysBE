import { BaseController } from '../common/base.controller';
import { InitDatabase } from '../db/InitDatabae.service';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import { OrganizationService } from './organization.service';
import 'reflect-metadata';

export class OrganizationsController extends BaseController {
	DBSchema: any;

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.DataBase) private DataBase: InitDatabase,
		@inject(TYPES.OrganizationService) private OrganizationService: OrganizationService
	) {
		super(loggerService);
		this.DBSchema = DataBase.DBSchema;
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
							const users = await this.OrganizationService.createRecord.bind(
								this.OrganizationService
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
						const users = await this.OrganizationService.findAll.bind(this.OrganizationService)(
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
						const users = await this.OrganizationService.findByParams.bind(
							this.OrganizationService
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
