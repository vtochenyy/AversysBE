import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { DictionaryService } from './dictionary.service';

@injectable()
export class DictionaryController extends BaseController {
	DBSchema: any;
	constructor(@inject(TYPES.ILogger) loggerService: ILogger) {
		super(loggerService);

		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				root: '/dicts',
				path: '/errors',
				method: 'get',
				func: async (req, res, next) => {},
			},
		]);
	}
}
