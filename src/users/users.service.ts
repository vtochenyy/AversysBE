import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import { IUserDto } from './user.dto.interface';

export class UserService {
	async createRecord(params: IUserDto, userEntity: any, next: NextFunction) {
		try {
			const user = await userEntity.create(params);
			return { id: user.id };
		} catch (error) {
			next(new HttpError(500, 'Service error', 'UserService'));
		}
	}

	async findAll(userEntity: any, next: NextFunction) {
		try {
			const users = await userEntity.findAll();
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
			const user = await userEntity.findAll({
				where: {
					id: userID,
				},
			});
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
