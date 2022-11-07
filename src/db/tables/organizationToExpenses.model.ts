import { Sequelize, DataTypes } from 'sequelize';
import { LoggerService } from '../../logger/logger.service';

export class OrganizationToExpensesModel {
	logger: LoggerService;
	sequelize: Sequelize;
	OrganizationToExpenses: unknown;

	constructor(sequelize: Sequelize, logger: LoggerService) {
		this.sequelize = sequelize;
		this.logger = logger;
		try {
			this.OrganizationToExpenses = this.sequelize.define('OrganizationToExpenses', {
				id: {
					primaryKey: true,
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
