import { Sequelize, DataTypes } from 'sequelize';
import { LoggerService } from '../../logger/logger.service';

export class OrganizationModel {
	logger: LoggerService;
	sequelize: Sequelize;
	Organization: unknown;

	constructor(sequelize: Sequelize, logger: LoggerService) {
		this.sequelize = sequelize;
		this.logger = logger;
		try {
			this.Organization = this.sequelize.define('Organizaions', {
				id: {
					primaryKey: true,
					type: DataTypes.UUID,
				},
				expanseId: {
					allowNull: false,
					unique: true,
					type: DataTypes.UUID,
				},
				organizationName: DataTypes.STRING,
				organizationAbbr: DataTypes.STRING,
				organizationType: DataTypes.ENUM('commerce', 'non-commerce'),
			});
			this.logger.log(`Table [Organization] was created succesfully`);
		} catch (error) {
			this.logger.err(`Table [Organization] dont created! Error: ${error}`);
		}
	}
}
