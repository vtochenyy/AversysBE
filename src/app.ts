import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import cors from 'cors';
import { ExeptionFilter } from './errors/exeption.filter';
import { OrganizationsController } from './organizations/organizations.controller';
import { injectable, inject } from 'inversify';
import { UsersController } from './users/users.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../backendAPI.json';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { DictionaryController } from './dicts/dictionary.controller';
import { IDatabaseService } from './db/databaseService.interface';
import { VerifyToken } from './crypto/VerifyToken';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import {ResponseHeaderSetter} from "./common/ResponseHeaderSetter";

@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UsersController) private usersController: UsersController,
        @inject(TYPES.DictionaryController) private dictionaryController: DictionaryController,
        @inject(TYPES.OrganizationsController)
        private organizationController: OrganizationsController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService,
        @inject(TYPES.VerifyToken) private verifyToken: VerifyToken
    ) {
        this.app = express();
        this.port = 9876;
    }

    public useRoutes() {
        this.app.options('*', cors({credentials: true, origin: 'http://localhost:3000'}));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(ResponseHeaderSetter);
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            this.logger.log([
                'Получен исходящий запрос',
                '[METHOD]: ' + JSON.stringify(req.method),
                '[URL]: ' + JSON.stringify(req.headers.host) + req.url,
                '[HEADERS]: ' + JSON.stringify(req.headers),
                '[BODY]: ' + JSON.stringify(req.body),
            ]);
            req.originalUrl !== '/users/login' && req.originalUrl !== '/users/register' &&
                this.verifyToken.veryfiUserTokenFromCookie(req.cookies.auth_token, next);
            next();
        });
        // next внутри контроллеров не вызывает другой контроллер, т.к. они являются элементами маршрутизации,
        // поэтому будет вызван следующий промежуточный обработчик, после контроллеров - exeptionFilter.
        this.app.use('/users', this.usersController.router);
        this.app.use('/org', this.organizationController.router);
        this.app.use('/dicts', this.dictionaryController.router);
    }

    public useSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }

    public useExeptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    //Порядок вызова middlewears: useSwagger -> useRoutes (только один раз, не вызывается повторно в рамках одногт запроса) -> useExeptionFilters
    public async init() {
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server running at port: ${this.port}`);
            this.useSwagger();
            this.useRoutes();
            this.useExeptionFilters();
            this.databaseService.connect();
        });
    }
}
