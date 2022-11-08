import { Sequelize, DataTypes } from 'sequelize';
import { injectable, inject } from 'inversify';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';

export class UserModel {
	sequelize: Sequelize;
	User: unknown;

	constructor(sequelize: Sequelize, @inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = sequelize;
		try {
			this.User = this.sequelize.define('Users', {
				id: {
					primaryKey: true,
					type: DataTypes.UUID,
				},
				orgId: DataTypes.UUID,
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
