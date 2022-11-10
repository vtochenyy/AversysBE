import { DataAccessProvider } from '../dal/dataAccessProvider';
import { TYPES } from '../types';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class BaseService {
	constructor(
		@inject(TYPES.DataAccessProvider) private dataAccessProvider: DataAccessProvider
	) {}
}
