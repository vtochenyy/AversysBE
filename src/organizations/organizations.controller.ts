import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { OrganizationService } from './organization.service';
import 'reflect-metadata';

export class OrganizationsController extends BaseController {
	DBSchema: any;

	constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
		super(loggerService);
		this.bindUserAPI();
	}
	public bindUserAPI() {
		this.bindRoutes([
			{
				root: '/org',
				path: '/create',
				method: 'post',
				func: async (req, res, next) => {},
			},
			{
				root: '/org',
				path: '/all',
				method: 'get',
				func: async (req, res, next) => {},
			},
			{
				root: '/org',
				path: '/findByParams',
				method: 'post',
				func: async (req, res, next) => {},
			},
		]);
	}
}
