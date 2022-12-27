import { NextFunction } from 'express';
import { UserModel, UsersLogs } from '@prisma/client';
import { HttpError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { TYPES } from '../types';
import { hash, compare, genSaltSync } from 'bcryptjs';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';
import { IUsersRepository } from './usersRepositoty.interface';
import 'reflect-metadata';

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

	async createRecord(params: any, next: NextFunction): Promise<BaseAnswer | undefined> {
		try {
			let userFromLoginCheck = await this.usersRepo.findByCriteria({ login: params.login });
			if (userFromLoginCheck.length > 0) {
				next(new HttpError(400, 'Такой пользователь уже существует', 'UserService'));
			} else {
				const mark1 = performance.now();
				params.password = await hash(params.password, genSaltSync(+this.configService.get('SALT')));
				const mark2 = performance.now();
				this.logger.debug(`Шифрование пароля пользователя заняло ${mark2 - mark1}`);
				const user = await this.usersRepo.create(params);
				return baseAnswer(201, user, []);
			}
		} catch (err) {
			next(new HttpError(500, 'Не удалось создать запись пользователя', 'UserService'));
		}
	}

	async findAll(userEntity: any, next: NextFunction) {}

	async getUserById(userID: string, userEntity: any, next: NextFunction) {}

	async login(userCredentials: { login: string; password: string }, next: NextFunction) {
		try {
			const findedUser = await this.usersRepo.findByCriteria({ login: userCredentials.login });
			if (findedUser.length == 0) {
				next(new HttpError(500, 'Login is incorrect', 'UserService'));
			} else {
				let compareResult = await compare(userCredentials.password, findedUser[0].password);
				if (!!compareResult) {
					this.logger.log(`The user ${findedUser[0].login} was authorized`);
					await this.usersRepo.createRecord({
						message: 'login',
						userId: findedUser[0].dataValues.id,
						login: findedUser[0].dataValues.login,
					});
					return baseAnswer(200, { user: { ...findedUser[0].dataValues }, isAuth: true }, []);
				} else {
					next(new HttpError(500, 'Password is incorrect', 'UserService'));
				}
			}
		} catch (error) {
			next(new HttpError(500, 'Error while login', 'UserService'));
		}
	}

	async logout(login: string, userEntity: any, usersLogsEntity: any, next: NextFunction) {}
}
