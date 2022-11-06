import { DataAccessProvider } from '../dal/dataAccessProvider';

export class BaseService {
	dataAccessProvider: DataAccessProvider;
	constructor() {
		this.dataAccessProvider = new DataAccessProvider();
	}
}
