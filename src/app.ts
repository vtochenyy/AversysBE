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
import 'reflect-metadata';
import { IDatabaseService } from './db/databaseService.interface';

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
        @inject(TYPES.DatabaseService) private databaseService: IDatabaseService
    ) {
        this.app = express();
        this.port = 9876;
    }

    public useRoutes() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
            this.logger.log([
                'Получен исходящий запрос',
                'HEADERS: ' + JSON.stringify(req.headers),
                'BODY: ' + JSON.stringify(req.body),
            ]);
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
