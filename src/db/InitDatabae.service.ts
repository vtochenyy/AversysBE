import { Sequelize } from 'sequelize';
import { injectable, inject } from 'inversify';
import { DBschema } from './dbSchema';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';

@injectable()
export class InitDatabase {
	sequelize: Sequelize;
	DBSchema: any;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = new Sequelize({
			port: 5432,
			database: 'weatherDB',
			password: 'postgres123321',
			username: 'postgres',
			dialect: 'postgres',
			host: 'localhost',
		});
		try {
			this.sequelize.authenticate();
			this.logger.log(`Connected to database`);
			this.DBSchema = new DBschema(this.sequelize, this.logger).genenericAllTables();
			this.sequelize.sync({ force: true });
		} catch (error) {
			this.logger.err(`Failed to coonnet to database: ${error}`);
		}
	}
}
