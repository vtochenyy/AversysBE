import { BaseController } from '../common/base.controller';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { DictionaryService } from './dictionary.service';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';

@injectable()
export class DictionaryController extends BaseController {
    DBSchema: any;
    constructor(
        @inject(TYPES.ILogger) loggerService: ILogger,
        @inject(TYPES.DictionaryService) private dictService: DictionaryService
    ) {
        super(loggerService);
        this.bindUserAPI();
    }

    public bindUserAPI() {
        this.bindRoutes([
            {
                root: '/dicts',
                path: '/errors',
                method: 'get',
                func: this.getErrors,
            },
        ]);
    }

    async getErrors(req: Request, res: Response, next: NextFunction) {
        try {
            let data = await this.dictService.getErrors(next);
            data && res.status(data.status).send(data);
        } catch (err) {
            next(new HttpError(400, 'Query is incorrect', 'DictionaryController'));
        }
    }
}
