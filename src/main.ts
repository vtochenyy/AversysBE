import { Container } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { OrganizationService } from './organizations/organization.service';
import { OrganizationsController } from './organizations/organizations.controller';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';
import { UserService } from './users/users.service';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { DictionaryController } from './dicts/dictionary.controller';
import { DictionaryService } from './dicts/dictionary.service';
import 'reflect-metadata';
import { IDatabaseService } from './db/databaseService.interface';
import { DatabaseService } from './db/database.service';
import { UsersRepository } from './users/users.repository';
import { IUsersRepository } from './users/usersRepositoty.interface';
import { IUsersLogsRepository } from './users/usersLogs/usersLogsRepository.interface';
import { UsersLogsRepository } from './users/usersLogs/usersLogs.repository';
import {DictionaryRepository} from "./dicts/dictionary.repository";

//Agregation root
const appContainer = new Container(); 

function bindDeps(){
    appContainer.bind<App>(TYPES.Application).to(App).inSingletonScope();
    appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
    appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
    appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
    appContainer.bind<UsersController>(TYPES.UsersController).to(UsersController).inSingletonScope();
    appContainer.bind<UserService>(TYPES.UsersService).to(UserService).inSingletonScope();
    appContainer.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
    appContainer.bind<IUsersLogsRepository>(TYPES.UsersLogsRepository).to(UsersLogsRepository).inSingletonScope();
    appContainer.bind<OrganizationsController>(TYPES.OrganizationsController).to(OrganizationsController).inSingletonScope();
    appContainer.bind<DictionaryController>(TYPES.DictionaryController).to(DictionaryController).inSingletonScope();
    appContainer.bind<DictionaryService>(TYPES.DictionaryService).to(DictionaryService).inSingletonScope();
    appContainer.bind<DictionaryRepository>(TYPES.DictionaryRepository).to(DictionaryRepository).inSingletonScope();
    appContainer.bind<IDatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
}
bindDeps();

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
