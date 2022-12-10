import { Sequelize, DataTypes } from 'sequelize';
import { inject } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import 'reflect-metadata';

export class ErrorDictModel {
	sequelize: Sequelize;
	ErrorDict: any;

	constructor(sequelize: Sequelize, @inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = sequelize;
		try {
			this.ErrorDict = this.sequelize.define('ErrorDicts', {
				id: {
					primaryKey: true,
					unique: true,
					type: DataTypes.UUID,
				},
				code: DataTypes.INTEGER,
				description: DataTypes.STRING,
			});
			this.logger.log(`Table [ErrorDict] was created succesfully`);
		} catch (error) {
			this.logger.err(`Table [ErrorDict] dont created! Error: ${error}`);
		}
	}
}
