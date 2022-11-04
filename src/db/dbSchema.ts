import { UserModel } from '../users/user.model';
import { Sequelize, Model } from 'sequelize';
import { LoggerService } from '../logger/logger.service';

export class DBschema {
	sequelize: Sequelize;
	logger: LoggerService;
	User: unknown;
	constructor(sequelize: Sequelize, logger: LoggerService) {
		this.sequelize = sequelize;
		this.logger = logger;
	}

	public genenericAllTables() {
		this.User = new UserModel(this.sequelize, this.logger).User;
		return { User: this.User };
	}
}
