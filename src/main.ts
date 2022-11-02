import { App } from './app';
import { InitDatabase } from './db/InitDatabae.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { UsersController } from './users/users.controller';

async function bootstrap() {
	const logger = new LoggerService();
	const app = new App(
		logger,
		new UsersController(logger),
		new ExeptionFilter(logger),
		new InitDatabase(logger)
	);
	await app.init();
}

bootstrap();
