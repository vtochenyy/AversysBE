import { Sequelize, DataTypes } from 'sequelize';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import 'reflect-metadata';

export class LogisticExpensesModel {
	sequelize: Sequelize;
	LogisticExpenses: unknown;

	constructor(sequelize: Sequelize, @inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = sequelize;
		try {
			this.LogisticExpenses = this.sequelize.define('LogisticExpenses', {
				id: {
					primaryKey: true,
					unique: true,
					type: DataTypes.UUID,
				},
				count: DataTypes.INTEGER,
				description: DataTypes.STRING,
			});
			this.logger.log(`Table [LogisticExpenses] was created succesfully`);
		} catch (error) {
			this.logger.err(`Table [LogisticExpenses] dont created! Error: ${error}`);
		}
	}
}
