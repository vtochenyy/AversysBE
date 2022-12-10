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
import { DataAccessProvider } from './dal/dataAccessProvider';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import 'reflect-metadata';
import { SequelizeInit } from './db/sequelize.init';
import { DictionaryController } from './dicts/dictionary.controller';
import { DictionaryService } from './dicts/dictionary.service';

//Agregation root
const appContainer = new Container(); 

function bindDeps(){
    appContainer.bind<App>(TYPES.Application).to(App).inSingletonScope();
    appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
    appContainer.bind<InitDatabase>(TYPES.DataBase).to(InitDatabase).inSingletonScope();
    appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    appContainer.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();
    appContainer.bind<OrganizationService>(TYPES.OrganizationService).to(OrganizationService).inSingletonScope();
    appContainer.bind<DictionaryService>(TYPES.DictionaryService).to(DictionaryService).inSingletonScope();
    appContainer.bind<DataAccessProvider>(TYPES.DataAccessProvider).to(DataAccessProvider).inSingletonScope();
    appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
    appContainer.bind<OrganizationsController>(TYPES.OrganizationsController).to(OrganizationsController).inSingletonScope();
    appContainer.bind<SequelizeInit>(TYPES.SequelizeInit).to(SequelizeInit).inSingletonScope();
    appContainer.bind<DictionaryController>(TYPES.DictionaryController).to(DictionaryController).inSingletonScope();
}
bindDeps();

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
