import { App } from './app';
import { InitDatabase } from './db/InitDatabae.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';

async function bootstrap() {
	const logger = new LoggerService();
	const dataBase = new InitDatabase(logger);
	const app = new App(
		logger,
		new UsersController(logger, dataBase.DBSchema, new UserService()),
		new ExeptionFilter(logger)
	);
	await app.init();
}

bootstrap();
