import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

export class App {
	app: Express;
	server: Server;
	port: number;
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.app = express();
		this.port = 9876;
		this.logger = logger;
	}

	public useRoutes() {
		new UsersController(this.logger, this.app);
	}

	public async init() {
		this.server = this.app.listen(this.port, () => {
			this.logger.log(`Server running at port: ${this.port}`);
			this.useRoutes();
		});
	}
}
