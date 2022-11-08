import { Sequelize, DataTypes } from 'sequelize';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import 'reflect-metadata';

export class OrganizationModel {
	sequelize: Sequelize;
	Organization: unknown;

	constructor(sequelize: Sequelize, @inject(TYPES.ILogger) private logger: ILogger) {
		this.sequelize = sequelize;
		try {
			this.Organization = this.sequelize.define('Organizaions', {
				id: {
					primaryKey: true,
					unique: true,
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
