import { Sequelize } from 'sequelize';
import { LoggerService } from '../logger/logger.service';
import { DBschema } from './dbSchema';
import { IInitDatabase } from './initDatabase.interface';

export class InitDatabase implements IInitDatabase {
	sequelize: Sequelize;
	logger: LoggerService;
	DBSchema: {};

	constructor(logger: LoggerService) {
		this.logger = logger;
		this.sequelize = new Sequelize({
			port: 5432,
			database: 'weatherDB',
			password: 'postgres123321',
			username: 'postgres',
			dialect: 'postgres',
			host: 'localhost',
		});
		this.testConnection();
	}

	public testConnection() {
		try {
			this.sequelize.authenticate();
			this.logger.log(`Connected to database`);
			this.genericTables();
		} catch (error) {
			this.logger.err(`Failed to coonnet to database: ${error}`);
		}
	}

	public genericTables() {
		this.DBSchema = new DBschema(this.sequelize, this.logger).genenericAllTables();
		this.sequelize.sync({ force: false });
	}
}
