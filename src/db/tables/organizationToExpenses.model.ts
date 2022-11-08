import { Sequelize, DataTypes } from 'sequelize';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import 'reflect-metadata';

export class OrganizationToExpensesModel {
	sequelize: Sequelize;
	OrganizationToExpenses: unknown;

	constructor(sequelize: Sequelize, @inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = sequelize;
		try {
			this.OrganizationToExpenses = this.sequelize.define('OrganizationToExpenses', {
				id: {
					primaryKey: true,
					unique: true,
					allowNull: false,
					type: DataTypes.UUID,
				},
				logisticId: DataTypes.UUID,
				stuffId: DataTypes.UUID,
				crudeId: DataTypes.UUID,
				investingId: DataTypes.UUID,
			});
			this.logger.log(`Table [OrganizationToExpenses] was created succesfully`);
		} catch (error) {
			this.logger.err(`Table [User] dont created! Error: ${error}`);
		}
	}
}
