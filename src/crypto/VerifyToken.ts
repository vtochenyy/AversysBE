import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ICryptoService } from './CryptoService.inteface';
import { ILogger } from '../logger/logger.interface';
import { NextFunction } from 'express';
import { HttpError } from '../errors/http-error.class';
import 'reflect-metadata';
@injectable()
export class VerifyToken {
    constructor(
        @inject(TYPES.CryptoService) private cryptoService: ICryptoService,
        @inject(TYPES.ILogger) private logger: ILogger
    ) {}

    veryfiUserTokenFromCookie(token: string | undefined, next: NextFunction): void {
        try {
            this.logger.debug(['token from query cookie', token]);
            let veryfiedToken = token && this.cryptoService.verifyAccessToken(token);
            this.logger.debug(['verifyedToken', veryfiedToken]);
        } catch (err) {
            next(new HttpError(401, 'Unauthorized', 'VerifyToken', 8));
        }
    }
}
