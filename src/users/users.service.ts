import { NextFunction } from 'express';
import { BaseService } from '../common/base.service';
import { HttpError } from '../errors/http-error.class';
import { IUserDto } from './user.dto.interface';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserService extends BaseService {
	async createRecord(params: IUserDto, userEntity: any, next: NextFunction) {
		try {
			const user = await this.dataAccessProvider.createRecord(params, userEntity, next);
			return { id: user.id };
		} catch (error) {
			next(new HttpError(500, 'Service error', 'UserService'));
		}
	}

	async findAll(userEntity: any, next: NextFunction) {
		try {
			const users = await this.dataAccessProvider.getAllRecords(userEntity, next);
			if (users.length == 0) {
				throw new Error();
			} else {
				return users;
			}
		} catch (error) {
			next(new HttpError(500, 'Records no found in table: Users', 'UserService'));
		}
	}

	async getUserById(userID: string, userEntity: any, next: NextFunction) {
		try {
			const user = await this.dataAccessProvider.getRecordByID(userID, userEntity, next);
			if (user.length == 0) {
				throw new Error();
			} else {
				return user;
			}
		} catch (error) {
			next(new HttpError(500, 'User not found by id', 'UserService'));
		}
	}
}
