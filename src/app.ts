import express, { Express, NextFunction, Request, Response } from 'express';
import { Server } from 'http';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { OrganizationsController } from './organizations/organizations.controller';
import { UsersController } from './users/users.controller';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../backendAPI.json';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;
	usersController: UsersController;
	organizationController: OrganizationsController;
	exeptionFilter: ExeptionFilter;

	constructor(
		logger: LoggerService,
		usersController: UsersController,
		organizationController: OrganizationsController,
		exeptionFilter: ExeptionFilter
	) {
		this.app = express();
		this.port = 9876;
		this.logger = logger;
		this.usersController = usersController;
		this.organizationController = organizationController;
		this.exeptionFilter = exeptionFilter;
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
