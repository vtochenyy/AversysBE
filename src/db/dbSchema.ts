import { UserModel } from './tables/user.model';
import { Sequelize, Model } from 'sequelize';
import { LoggerService } from '../logger/logger.service';
import { OrganizationModel } from './tables/organization.model';
import { OrganizationToExpensesModel } from './tables/organizationToExpenses.model';

export class DBschema {
	sequelize: Sequelize;
	logger: LoggerService;
	User: unknown;
	Organization: unknown;
	OrganizationToExpenses: unknown;
	OrganizationToIncome: unknown;
	LogisticExpenses: unknown;
	StuffExpenses: unknown;
	CrudeExpenses: unknown;
	IvnestingExpenses: unknown;
	ServiceIncomes: unknown;
	ProductsIncomes: unknown;
	InvestingIncomes: unknown;

	constructor(sequelize: Sequelize, logger: LoggerService) {
		this.sequelize = sequelize;
		this.logger = logger;
	}

	public genenericAllTables(): {
		User: any;
		Organization: any;
		OrganizationToExpenses: any;
	} {
		this.User = new UserModel(this.sequelize, this.logger).User;
		this.Organization = new OrganizationModel(this.sequelize, this.logger).Organization;
		this.OrganizationToExpenses = new OrganizationToExpensesModel(
			this.sequelize,
			this.logger
		).OrganizationToExpenses;
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
