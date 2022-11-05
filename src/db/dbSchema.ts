import { UserModel } from '../users/user.model';
import { Sequelize, Model } from 'sequelize';
import { LoggerService } from '../logger/logger.service';
import { OrganizationModel } from '../organizations/organization.model';

export class DBschema {
	sequelize: Sequelize;
	logger: LoggerService;
	User: unknown;
	Organization: unknown;
	constructor(sequelize: Sequelize, logger: LoggerService) {
		this.sequelize = sequelize;
		this.logger = logger;
	}

	public genenericAllTables() {
		this.User = new UserModel(this.sequelize, this.logger).User;
		this.Organization = new OrganizationModel(this.sequelize, this.logger).Organization;
		return { User: this.User, Organization: this.Organization };
	}
}
