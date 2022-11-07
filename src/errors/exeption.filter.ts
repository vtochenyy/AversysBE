import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { IExeptionFilter } from './exeption.filter.interface';
import { HttpError } from './http-error.class';

export class ExeptionFilter implements IExeptionFilter {
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.logger = logger;
		this.logger.log('Зарегистрирован обрбаотчик ошибок');
	}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.logger.err(`[${err.context}] ошибка ${err.statusCode} ${err.message}`);
			res
				.status(err.statusCode)
				.send({ statusCode: err.statusCode, errorText: err.message, context: err.context });
		} else {
			this.logger.err(`${err.message}`);
			res.status(500).send(err.message);
		}
	}
}
