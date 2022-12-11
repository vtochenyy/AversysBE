import { UserModel } from './tables/user.model';
import { Sequelize, QueryTypes } from 'sequelize';
import { OrganizationModel } from './tables/organization.model';
import { OrganizationToExpensesModel } from './tables/organizationToExpenses.model';
import { ILogger } from '../logger/logger.interface';
import { LogisticExpensesModel } from './tables/logisticExpenses.model';
import { UsersLogsModel } from './tables/users.logs.model';
import ErrorDict from '../dicts/errorDict.json';
import { inject } from 'inversify';
import { TYPES } from '../types';
import { DataAccessProvider } from '../dal/dataAccessProvider';
import { ErrorDictModel } from './tables/errorDict.model';

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
	ErrorDict: any;

	constructor(
		@inject(TYPES.DataAccessProvider) private DAL: DataAccessProvider,
		sequelize: Sequelize,
		private logger: ILogger
	) {
		this.sequelize = sequelize;
	}

	public genenericAllTables(): {
		User: any;
		Organization: any;
		OrganizationToExpenses: any;
		LogisticExpenses: any;
		UsersLogs: any;
		ErrorDict: any;
	} {
		//Tables
		this.OrganizationToExpenses = new OrganizationToExpensesModel(
			this.sequelize,
			this.logger
		).OrganizationToExpenses;
		this.ErrorDict = new ErrorDictModel(this.sequelize, this.logger).ErrorDict;
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

		//Migrations
		setTimeout(() => {
			this.ErrorDict.destroy({ where: {}, truncate: true });
			ErrorDict.data.forEach((el) => {
				this.DAL.createRecord(el, this.ErrorDict);
			});
		}, 5000);

		return {
			User: this.User,
			Organization: this.Organization,
			OrganizationToExpenses: this.OrganizationToExpenses,
			LogisticExpenses: this.LogisticExpenses,
			UsersLogs: this.UsersLogs,
			ErrorDict: this.ErrorDict,
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
