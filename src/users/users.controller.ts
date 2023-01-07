import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { HttpError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { UserService } from './users.service';
import 'reflect-metadata';

@injectable()
export class UsersController extends BaseController {
    constructor(
        @inject(TYPES.ILogger) private loggerService: ILogger,
        @inject(TYPES.UsersService) private userService: UserService
    ) {
        super(loggerService);
        this.bindUserAPI();
    }

    public bindUserAPI() {
        this.bindRoutes([
            {
                root: '/users',
                path: '/all',
                method: 'get',
                func: this.findAllUsers,
            },
            {
                root: '/users',
                path: '/register',
                method: 'post',
                func: this.register,
            },
            {
                root: '/users',
                path: '/findByParams',
                method: 'post',
                func: this.findByParams,
            },
            {
                root: '/users',
                path: '/login',
                method: 'post',
                func: this.login,
            },
            {
                root: '/users',
                path: '/logout',
                method: 'post',
                func: this.logout,
            },
            {
                root: '/users',
                path: '/getById',
                method: 'get',
                func: this.findById,
            },
            {
                root: '/users',
                path: '/getActivityByUserId',
                method: 'get',
                func: this.getUserActivity,
            }
        ]);
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            if (!!req.body.login && !!req.body.password) {
                let data = await this.userService.createRecord(req.body, next);
                data && res.status(data.status).send(data);
            } else {
                throw new Error();
            }
        } catch (err) {
            this.loggerService.err(err);
            next(new HttpError(400, 'Неверно сформирован запрос', 'UsersController', 3));
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            if (!!req.body.login && !!req.body.password) {
                let data = await this.userService.login(
                    { login: req.body.login, password: req.body.password },
                    next
                );
                data && res.status(data.status).send(data);
            }
        } catch (err) {
            next(new HttpError(400, 'Error', 'UserController', 3));
        }
    }

    async findById(req: Request, res: Response, next: NextFunction) {
        try {
            if (!!req.query.id) {
                let data =
                    typeof req.query.id === 'string' &&
                    (await this.userService.getUserById(req.query.id, next));
                data && res.status(data.status).send(data);
            }
        } catch (err) {
            next(new HttpError(400, 'Query is incorrect', 'UserController', 3));
        }
    }

    async findByParams(req: Request, res: Response, next: NextFunction) {
        try {
            let data = await this.userService.findUsersByParams(req.body, next);
            data && res.status(data.status).send(data);
        } catch (err) {
            next(new HttpError(400, 'Query is incorrect', 'UserController', 3));
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.body.id && typeof req.body.id === 'string') {
                let data = await this.userService.logout(req.body.id, next);
                data && res.status(data.status).send(data);
            }
        } catch (err) {
            next(new HttpError(400, 'Query is incorrect', 'UserController', 3));
        }
    }

    async findAllUsers(req: Request, res: Response, next: NextFunction) {
        try {
            let data = await this.userService.findAll(next);
            data && res.status(data.status).send(data);
        } catch (err) {
            next(new HttpError(400, 'Query is incorrect', 'UserController', 3));
        }
    }

    async getUserActivity(req: Request, res: Response, next: NextFunction){
        try{
            if (!!req.query.take && !!req.query.skip && !!req.query.userId && typeof req.query.userId === 'string'){
                let data = await this.userService.getUserActivity(req.query.userId, {take: +req.query.take, skip: +req.query.skip}, next);
                data && res.status(data.status).send(data);
            } else {
                throw new Error();
            }
        } catch (err){
            next(new HttpError(400, 'Query is incorrect', 'UserController', 3));
        }
    }
}
