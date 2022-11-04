import { Sequelize } from 'sequelize';
import { LoggerService } from '../logger/logger.service';

export interface IInitDatabase {
	logger: LoggerService;
	sequelize: Sequelize;
	genericTables: () => void;
	testConnection: () => void;
}
