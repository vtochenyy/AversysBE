import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { ExeptionFilter } from './errors/exeption.filter';
import { OrganizationsController } from './organizations/organizations.controller';
import { injectable, inject } from 'inversify';
import { UsersController } from './users/users.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../backendAPI.json';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: UsersController,
		@inject(TYPES.OrganizationsController)
		private organizationController: OrganizationsController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
	) {
		this.app = express();
		this.port = 9876;
	}

	public useRoutes() {
		this.app.use(express.json());
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			this.logger.log('Получен исходящий запрос');
			next();
		});
		this.app.use('/users', this.usersController.router);
		this.app.use('/org', this.organizationController.router);
	}

	public useSwagger() {
		this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	}

	public useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init() {
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server running at port: ${this.port}`);
			this.useSwagger();
			this.useRoutes();
			this.useExeptionFilters();
		});
	}
}
