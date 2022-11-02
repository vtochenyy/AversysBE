import { Sequelize } from 'sequelize';
import { LoggerService } from '../logger/logger.service';
import { IInitDatabase } from './initDatabase.interface';

export class InitDatabase implements IInitDatabase {
	sequelize: Sequelize;
	logger: LoggerService;

	constructor(logger: LoggerService) {
		this.logger = logger;
		// this.connect();
		// this.testConnection();
	}

	public connect() {
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

	public async testConnection() {
		try {
			await this.sequelize.authenticate();
			this.logger.log(`Connected to database`);
		} catch (error) {
			this.logger.err(`Failed to coonnet to database: ${error}`);
		}
	}
}
