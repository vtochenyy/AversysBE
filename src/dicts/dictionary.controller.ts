import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { InitDatabase } from '../db/InitDatabae.service';
import 'reflect-metadata';
import { DictionaryService } from './dictionary.service';

@injectable()
export class DictionaryController extends BaseController {
	DBSchema: any;
	constructor(
		@inject(TYPES.ILogger) loggerService: ILogger,
		@inject(TYPES.DataBase) DataBase: InitDatabase,
		@inject(TYPES.DictionaryService) private dictionaryService: DictionaryService
	) {
		super(loggerService);
		this.DBSchema = DataBase.DBSchema;
		this.bindUserAPI();
	}

	public bindUserAPI() {
		this.bindRoutes([
			{
				root: '/dicts',
				path: '/errors',
				method: 'get',
				func: async (req, res, next) => {
					try {
						const users = await this.dictionaryService.getErrors.bind(this.dictionaryService)(
							this.DBSchema.ErrorDict,
							next
						);
						!!users && res.status(200).send(users);
					} catch {
						next(new HttpError(500, '7', 'DictionaryController'));
					}
				},
			},
		]);
	}
}
