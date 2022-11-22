import { UserModel } from './tables/user.model';
import { Sequelize } from 'sequelize';
import { OrganizationModel } from './tables/organization.model';
import { OrganizationToExpensesModel } from './tables/organizationToExpenses.model';
import { ILogger } from '../logger/logger.interface';
import { LogisticExpensesModel } from './tables/logisticExpenses.model';
import { UsersLogsModel } from './tables/users.logs.model';

export class DBschema {
	sequelize: Sequelize;
	User: any;
	UsersLogs: any;
	Organization: any;
	OrganizationToExpenses: any;
	OrganizationToIncome: any;
	LogisticExpenses: any;
	StuffExpenses: any;
	CrudeExpenses: any;
	IvnestingExpenses: any;
	ServiceIncomes: any;
	ProductsIncomes: any;
	InvestingIncomes: any;

	constructor(sequelize: Sequelize, private logger: ILogger) {
		this.sequelize = sequelize;
	}

	public genenericAllTables(): {
		User: any;
		Organization: any;
		OrganizationToExpenses: any;
		LogisticExpenses: any;
		UsersLogs: any;
	} {
		//Tables
		this.OrganizationToExpenses = new OrganizationToExpensesModel(
			this.sequelize,
			this.logger
		).OrganizationToExpenses;
		this.Organization = new OrganizationModel(this.sequelize, this.logger).Organization;
		this.User = new UserModel(this.sequelize, this.logger).User;
		this.UsersLogs = new UsersLogsModel(this.sequelize, this.logger).UsersLogs;
		this.LogisticExpenses = new LogisticExpensesModel(this.sequelize, this.logger).LogisticExpenses;

		//Relations
		this.OrganizationToExpenses.hasOne(this.Organization, { foreignKey: 'expanseId' });
		this.Organization.hasOne(this.User, { foreignKey: 'orgId' });

		this.OrganizationToExpenses.hasMany(this.LogisticExpenses);
		this.LogisticExpenses.belongsTo(this.OrganizationToExpenses);

		this.User.hasOne(this.UsersLogs, { foreignKey: 'userId' });

		return {
			User: this.User,
			Organization: this.Organization,
			OrganizationToExpenses: this.OrganizationToExpenses,
			LogisticExpenses: this.LogisticExpenses,
			UsersLogs: this.UsersLogs,
			// Organization_to_Income: this.OrganizationToIncome,
			// LogisticExpenses: this.LogisticExpenses,
			// StuffExpenses: this.StuffExpenses,
			// CrudeExpenses: this.CrudeExpenses,
			// IvnestingExpenses: this.IvnestingExpenses,
			// ServiceIncomes: this.ServiceIncomes,
			// ProductsIncomes: this.ProductsIncomes,
			// InvestingIncomes: this.InvestingIncomes,
		};
	}
}
