import { Sequelize } from 'sequelize';
import { LoggerService } from '../logger/logger.service';

export interface IInitDatabase {
	logger: LoggerService;
	sequelize: Sequelize;
	connect: () => void;
	testConnection: () => void;
}
