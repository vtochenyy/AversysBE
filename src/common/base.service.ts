import { DataAccessProvider } from '../dal/dataAccessProvider';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class BaseService {
	dataAccessProvider: DataAccessProvider;
	constructor() {
		this.dataAccessProvider = new DataAccessProvider();
	}
}
