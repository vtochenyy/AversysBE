import { NextFunction } from 'express';
import { BaseService } from '../common/base.service';
import { HttpError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { DataAccessProvider } from '../dal/dataAccessProvider';
import { TYPES } from '../types';
import { LoggerService } from '../logger/logger.service';
import 'reflect-metadata';

@injectable()
export class DictionaryService extends BaseService {
	constructor(
		@inject(TYPES.DataAccessProvider) private accessProvider: DataAccessProvider,
		@inject(TYPES.ILogger) private logger: LoggerService
	) {
		super(accessProvider);
	}

	async getErrors(errorDictsEntity: any, next: NextFunction) {
		try {
			const errors = await this.accessProvider.getAllRecords(errorDictsEntity, next);
			return baseAnswer(200, errors, []);
		} catch (error) {
			next(new HttpError(500, 'Errors not found', 'DictionaryService'));
		}
	}
}
