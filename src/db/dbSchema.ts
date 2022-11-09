import { UserModel } from './tables/user.model';
import { Sequelize } from 'sequelize';
import { OrganizationModel } from './tables/organization.model';
import { OrganizationToExpensesModel } from './tables/organizationToExpenses.model';
import { ILogger } from '../logger/logger.interface';

export class DBschema {
	sequelize: Sequelize;
	User: any;
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
	} {
		this.OrganizationToExpenses = new OrganizationToExpensesModel(
			this.sequelize,
			this.logger
		).OrganizationToExpenses;
		this.Organization = new OrganizationModel(this.sequelize, this.logger).Organization;
		this.User = new UserModel(this.sequelize, this.logger).User;

		this.OrganizationToExpenses.hasOne(this.Organization, { foreignKey: 'expanseId' });
		this.Organization.hasOne(this.User, { foreignKey: 'orgId' });
		return {
			User: this.User,
			Organization: this.Organization,
			OrganizationToExpenses: this.OrganizationToExpenses,
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
