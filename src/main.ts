import { Container } from 'inversify';
import { App } from './app';
import { InitDatabase } from './db/InitDatabae.service';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { OrganizationService } from './organizations/organization.service';
import { OrganizationsController } from './organizations/organizations.controller';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';
import 'reflect-metadata';
import { DataAccessProvider } from './dal/dataAccessProvider';

//Agregation root

const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
appContainer
	.bind<IExeptionFilter>(TYPES.ExeptionFilter)
	.to(ExeptionFilter)
	.inSingletonScope();
appContainer.bind<InitDatabase>(TYPES.DataBase).to(InitDatabase).inSingletonScope();
appContainer.bind<App>(TYPES.Application).to(App);
appContainer.bind<UserService>(TYPES.UserService).to(UserService);
appContainer.bind<OrganizationService>(TYPES.OrganizationService).to(OrganizationService);
appContainer
	.bind<DataAccessProvider>(TYPES.DataAccessProvider)
	.to(DataAccessProvider)
	.inSingletonScope();
appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController);
appContainer
	.bind<OrganizationsController>(TYPES.OrganizationsController)
	.to(OrganizationsController);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
