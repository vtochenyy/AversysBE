import { injectable, inject } from 'inversify';
import { DBschema } from './dbSchema';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { SequelizeInit } from './sequelize.init';
import { DataAccessProvider } from '../dal/dataAccessProvider';

@injectable()
export class InitDatabase {
	DBSchema: any;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.SequelizeInit) private sequelizeInit: SequelizeInit,
		@inject(TYPES.DataAccessProvider) private DAL: DataAccessProvider
	) {
		try {
			this.DBSchema = new DBschema(
				this.DAL,
				this.sequelizeInit.sequelize,
				this.logger
			).genenericAllTables();
		} catch (error) {
			this.logger.err(`Failed to coonnet to database: ${error}`);
		}
	}
}
