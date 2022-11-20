import { Sequelize } from 'sequelize';
import { injectable, inject } from 'inversify';
import { DBschema } from './dbSchema';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { SequelizeInit } from './sequelize.init';

@injectable()
export class InitDatabase {
	DBSchema: any;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.SequelizeInit) private sequelizeInit: SequelizeInit
	) {
		try {
			this.DBSchema = new DBschema(this.sequelizeInit.sequelize, this.logger).genenericAllTables();
		} catch (error) {
			this.logger.err(`Failed to coonnet to database: ${error}`);
		}
	}
}
