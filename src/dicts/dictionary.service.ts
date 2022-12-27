import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { TYPES } from '../types';
import { LoggerService } from '../logger/logger.service';
import 'reflect-metadata';

@injectable()
export class DictionaryService {
	constructor(@inject(TYPES.ILogger) private logger: LoggerService) {}

	async getErrors(errorDictsEntity: any, next: NextFunction) {
		try {
		} catch (error) {
			next(new HttpError(500, 'Errors not found', 'DictionaryService'));
		}
	}
}
