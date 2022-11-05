import { App } from './app';
import { InitDatabase } from './db/InitDatabae.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { OrganizationService } from './organizations/organization.service';
import { OrganizationsController } from './organizations/organizations.controller';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';

async function bootstrap() {
	const logger = new LoggerService();
	const dataBase = new InitDatabase(logger);
	const app = new App(
		logger,
		new UsersController(logger, dataBase.DBSchema, new UserService()),
		new OrganizationsController(logger, dataBase.DBSchema, new OrganizationService()),
		new ExeptionFilter(logger)
	);
	await app.init();
}

bootstrap();
