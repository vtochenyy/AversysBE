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
			const checkUniqueUser = await this.accessProvider.getRecordByParams(
				{ login: params.login },
				userEntity,
				next
			);
			if (checkUniqueUser.length > 0) {
				next(new HttpError(402, 'Пользователь с таким логином уже существует', 'UserService'));
			} else {
				const salt = genSaltSync(+this.configService.get('SALT'));
				const mark1 = performance.now();
				params.password = await hash(params.password, salt);
				const mark2 = performance.now();
				this.logger.debug(`Шифрование пароля пользователя заняло ${mark2 - mark1}`);
				const user = await this.accessProvider.createRecord(params, userEntity, next);
				return baseAnswer(200, { user, isAuth: true }, []);
			}
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

	async login(
		userCredentials: { login: string; password: string },
		userEntity: any,
		next: NextFunction
	) {
		try {
			const findedUser = await this.accessProvider.getRecordByParams(
				{ login: userCredentials.login },
				userEntity,
				next
			);
			if (findedUser.length == 0) {
				next(new HttpError(500, 'Login is incorrect', 'UserService'));
			} else {
				let compareResult = await compare(userCredentials.password, findedUser[0].password);
				if (!!compareResult) {
					this.logger.log(`The user ${findedUser[0].login} was authorized`);
					return baseAnswer(200, { user: { ...findedUser[0].dataValues }, isAuth: true }, []);
				} else {
					next(new HttpError(500, 'Password is incorrect', 'UserService'));
				}
			}
		} catch (error) {
			next(new HttpError(500, 'Error while login', 'UserService'));
		}
	}

	async logout(login: string) {
		this.logger.log(`User ${login} was logout`);
		return baseAnswer(200, { isAuth: false }, []);
	}
}
