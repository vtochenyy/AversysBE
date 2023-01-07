import { NextFunction, Response } from 'express';
import { v1 as uuidv1 } from 'uuid';
import { HttpError } from '../errors/http-error.class';
import { injectable, inject } from 'inversify';
import { baseAnswer } from '../common/baseAnswer';
import { TYPES } from '../types';
import { hash, compare, genSaltSync } from 'bcryptjs';
import { LoggerService } from '../logger/logger.service';
import { ConfigService } from '../config/config.service';
import { IUsersRepository } from './usersRepositoty.interface';
import { IUsersLogsRepository } from './usersLogs/usersLogsRepository.interface';
import { ICryptoService } from '../crypto/CryptoService.inteface';
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
        @inject(TYPES.UsersRepository) private usersRepo: IUsersRepository,
        @inject(TYPES.UsersLogsRepository) private usersLogsRepo: IUsersLogsRepository,
        @inject(TYPES.CryptoService) private cryptoService: ICryptoService
    ) {}

    async createRecord(params: any, next: NextFunction): Promise<BaseAnswer | undefined> {
        try {
            let userFromLoginCheck = await this.usersRepo.findByCriteria({ login: params.login });
            if (userFromLoginCheck.length > 0) {
                next(new HttpError(400, 'Такой пользователь уже существует', 'UserService', 6));
            } else {
                const mark1 = performance.now();
                params.password = await hash(
                    params.password,
                    genSaltSync(+this.configService.get('SALT'))
                );
                const mark2 = performance.now();
                this.logger.debug(`Шифрование пароля пользователя заняло ${mark2 - mark1}`);
                const user = await this.usersRepo.create(params);
                return baseAnswer(201, user, []);
            }
        } catch (err) {
            next(new HttpError(500, 'Не удалось создать запись пользователя', 'UserService', 11));
        }
    }

    async findAll(next: NextFunction) {
        try {
            let users = await this.usersRepo.findAll();
            return baseAnswer(200, users, []);
        } catch (err) {
            next(new HttpError(500, 'Error while finding users by params', 'UserService', 7));
        }
    }

    async getUserById(userID: string, next: NextFunction) {
        try {
            const user = await this.usersRepo.findById(userID);
            if (!user) {
                throw new Error();
            } else {
                return baseAnswer(200, user, []);
            }
        } catch (err) {
            next(new HttpError(500, 'User not found by id', 'UserService', 5));
        }
    }

    async login(
        userCredentials: { login: string; password: string },
        next: NextFunction,
        res: Response
    ) {
        try {
            const findedUser = await this.usersRepo.findByCriteria({
                login: userCredentials.login,
            });
            if (findedUser.length == 0) {
                next(new HttpError(500, 'Login is incorrect', 'UserService', 1));
            } else {
                let compareResult = await compare(userCredentials.password, findedUser[0].password);
                if (!!compareResult) {
                    this.logger.log(`The user ${findedUser[0].login} was authorized`);
                    let recordId = uuidv1();
                    this.usersLogsRepo.create({
                        id: recordId,
                        message: 'login',
                        userId: findedUser[0].id,
                    });
                    let token = this.cryptoService.createAccessToken({
                        userId: findedUser[0].id,
                        login: findedUser[0].login,
                    });
                    this.logger.debug([`${findedUser[0].login} was got a acess token: `, token]);
                    let newUserData = await this.usersRepo.update(findedUser[0].id, {
                        token: token,
                    });
                    res.cookie('token', newUserData.token);
                    return baseAnswer(
                        200,
                        { user: { ...newUserData, token: true }, isAuth: true },
                        []
                    );
                } else {
                    next(new HttpError(500, 'Password is incorrect', 'UserService', 2));
                }
            }
        } catch (error) {
            next(new HttpError(500, 'Error while login ' + error, 'UserService', 7));
        }
    }

    async findUsersByParams(params: any, next: NextFunction) {
        try {
            let users = await this.usersRepo.findByCriteria(params);
            if (!users) {
                throw new Error();
            } else {
                return baseAnswer(200, users, []);
            }
        } catch (err) {
            next(new HttpError(500, 'Users not found by params', 'UserService', 7));
        }
    }

    async logout(userId: string, next: NextFunction) {
        try {
            let user = await this.getUserById(userId, next);
            if (!!user) {
                let recordId = uuidv1();
                this.usersLogsRepo.create({ id: recordId, userId: userId, message: 'logout' });
                this.logger.log(`User ${user.data.login} was logout`);
                return baseAnswer(200, { isAuth: false }, []);
            }
        } catch (err) {
            new HttpError(500, 'Error while logout user', 'UserService', 7);
        }
    }

    async getUserActivity(
        userId: string,
        paging: { take: number; skip: number },
        next: NextFunction
    ) {
        try {
            let userActivity = await this.usersLogsRepo.getAllRecordsByUserId(userId, paging);
            return baseAnswer(200, userActivity, paging);
        } catch (err) {
            next(new HttpError(500, 'Error while getting user activity', 'UserService', 7));
        }
    }
}
