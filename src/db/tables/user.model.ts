import { Sequelize, DataTypes } from 'sequelize';
import { LoggerService } from '../../logger/logger.service';

export class UserModel {
	logger: LoggerService;
	sequelize: Sequelize;
	User: unknown;

	constructor(sequelize: Sequelize, logger: LoggerService) {
		this.sequelize = sequelize;
		this.logger = logger;
		try {
			this.User = this.sequelize.define('Users', {
				id: {
					primaryKey: true,
					type: DataTypes.UUID,
				},
				firstName: DataTypes.STRING,
				lastName: DataTypes.STRING,
				age: DataTypes.INTEGER,
			});
			this.logger.log(`Table [User] was created succesfully`);
		} catch (error) {
			this.logger.err(`Table [User] dont created! Error: ${error}`);
		}
	}
}
