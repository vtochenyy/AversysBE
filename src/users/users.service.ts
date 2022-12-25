import { NextFunction } from 'express';
import { UserModel } from '@prisma/client';
import { HttpError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { TYPES } from '../types';
import { hash, compare, genSaltSync } from 'bcryptjs';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';
import 'reflect-metadata';
import { IUsersRepository } from './usersRepositoty.interface';

type BaseAnswer = {
	status: number;
	data: Object;
	paging: Object;
};

@injectable()
export class UserService {
	constructor(
		@inject(TYPES.ILogger) private logger: LoggerService,
		@inject(TYPES.ConfigService) private configService: ConfigService,
		@inject(TYPES.UsersRepository) private usersRepo: IUsersRepository
	) {}

	async createRecord(params: UserModel, next: NextFunction): Promise<BaseAnswer | undefined> {
		try {
			const mark1 = performance.now();
			params.password = await hash(params.password, genSaltSync(+this.configService.get('SALT')));
			const mark2 = performance.now();
			this.logger.debug(`Шифрование пароля пользователя заняло ${mark2 - mark1}`);
			const user = await this.usersRepo.create(params);
			return baseAnswer(201, user, []);
		} catch (err) {
			next(new HttpError(500, 'Не удалось создать запись пользователя', 'UserService'));
		}
	}

	async findAll(userEntity: any, next: NextFunction) {}

	async getUserById(userID: string, userEntity: any, next: NextFunction) {}

	async login(
		userCredentials: { login: string; password: string },
		userEntity: any,
		usersLogsEntity: any,
		next: NextFunction
	) {}

	async logout(login: string, userEntity: any, usersLogsEntity: any, next: NextFunction) {}
}
