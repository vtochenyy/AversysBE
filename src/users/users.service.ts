import { Sequelize } from 'sequelize';
import { HttpError } from '../errors/http-error.class';
import { IUserDto } from './user.dto.interface';

export class UserService {
	async createRecord(params: IUserDto, userEntity: any) {
		try {
			const user = await userEntity.create(params);
			return { id: user.id };
		} catch (error) {
			new HttpError(500, 'Service error', 'UserService');
		}
	}
}
