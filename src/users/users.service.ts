import { NextFunction } from 'express';
import { BaseService } from '../common/base.service';
import { HttpError } from '../errors/http-error.class';
import { IUserDto } from './user.dto.interface';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { DataAccessProvider } from '../dal/dataAccessProvider';
import { TYPES } from '../types';
import { hash, compare, genSaltSync } from 'bcryptjs';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';
import 'reflect-metadata';

@injectable()
export class UserService extends BaseService {
	constructor(
		@inject(TYPES.DataAccessProvider) private accessProvider: DataAccessProvider,
		@inject(TYPES.ILogger) private logger: LoggerService,
		@inject(TYPES.ConfigService) private configService: ConfigService
	) {
		super(accessProvider);
	}
	async createRecord(params: IUserDto, userEntity: any, next: NextFunction) {
		try {
			let salt = genSaltSync(+this.configService.get('SALT'));
			const mark1 = performance.now();
			params.password = await hash(params.password, salt);
			const mark2 = performance.now();
			this.logger.debug(`Шифрование пароля пользователя заняло ${mark2 - mark1}`);
			const user = await this.accessProvider.createRecord(params, userEntity, next);
			return baseAnswer(200, { id: user.id }, []);
		} catch (error) {
			next(new HttpError(500, 'Service error', 'UserService'));
		}
	}

	async findAll(userEntity: any, next: NextFunction) {
		try {
			const users = await this.accessProvider.getAllRecords(userEntity, next);
			return baseAnswer(200, users, []);
		} catch (error) {
			next(new HttpError(500, 'Records no found in table: Users', 'UserService'));
		}
	}

	async getUserById(userID: string, userEntity: any, next: NextFunction) {
		try {
			const user = await this.accessProvider.getRecordByID(userID, userEntity, next);
			return baseAnswer(200, user, []);
		} catch (error) {
			next(new HttpError(500, 'User not found by id', 'UserService'));
		}
	}
}
