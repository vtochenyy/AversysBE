import { injectable, inject } from 'inversify';
import { DataTypes, Sequelize } from 'sequelize';
import { ILogger } from '../../logger/logger.interface';
import { TYPES } from '../../types';

export class UsersLogsModel {
	sequelize: Sequelize;
	UsersLogs: unknown;

	constructor(sequelize: Sequelize, @inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = sequelize;
		try {
			this.UsersLogs = this.sequelize.define('UsersLogs', {
				id: {
					primaryKey: true,
					type: DataTypes.UUID,
				},
				message: DataTypes.STRING,
				login: DataTypes.STRING,
				firstName: DataTypes.STRING,
				lastName: DataTypes.STRING,
			});
			this.logger.log(`Table [UsersLogs] was created succesfully`);
		} catch (error) {
			this.logger.err(`Table [UsersLogs] dont created! Error: ${error}`);
		}
	}
}
