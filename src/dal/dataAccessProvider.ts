import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { v1 as uuidv1 } from 'uuid';

export class DataAccessProvider {
	async createRecord(params: any, dataAcessEntity: any, next: NextFunction) {
		try {
			params.id = uuidv1();
			let dataResponse = await dataAcessEntity.create(params);
			return dataResponse;
		} catch (error) {
			next(new HttpError(500, 'Error while creating record', 'DataAccessProvider'));
		}
	}

	async updateRecordById(
		id: string,
		params: any,
		dataAcessEntity: any,
		next: NextFunction
	) {
		try {
			let dataResponse = await dataAcessEntity.update(params, {
				where: {
					id: id,
				},
			});
			return dataResponse;
		} catch (error) {
			next(new HttpError(500, 'Error while updating record', 'DataAccessProvider'));
		}
	}

	async deleteRecordById(id: string, dataAcessEntity: any, next: NextFunction) {
		try {
			let dataResponse = await dataAcessEntity.destroy({
				where: {
					id: id,
				},
			});
			return dataResponse;
		} catch (error) {
			next(new HttpError(500, 'Error while deleting record', 'DataAccessProvider'));
		}
	}

	async getAllRecords(dataAcessEntity: any, next: NextFunction) {
		try {
			let dataResponse = await dataAcessEntity.findAll();
			return dataResponse;
		} catch (error) {
			next(new HttpError(500, 'Error while get record by id', 'DataAccessProvider'));
		}
	}

	async getRecordByID(id: string, dataAcessEntity: any, next: NextFunction) {
		try {
			let dataResponse = await dataAcessEntity.findAll({
				where: {
					id: id,
				},
			});
			return dataResponse;
		} catch (error) {
			next(new HttpError(500, 'Error while get record by id', 'DataAccessProvider'));
		}
	}

	async getRecordByParams(params: any, dataAcessEntity: any, next: NextFunction) {
		try {
			let dataResponse = await dataAcessEntity.findAll({
				where: params,
			});
			return dataResponse;
		} catch (error) {
			next(new HttpError(500, 'Error while get record by params', 'DataAccessProvider'));
		}
	}
}
