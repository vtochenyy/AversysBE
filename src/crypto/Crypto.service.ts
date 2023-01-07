import { ICryptoService } from './CryptoService.inteface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import jwt from 'jsonwebtoken';
import { ConfigService } from '../config/config.service';
import 'reflect-metadata';

type tokenPayload = {
    userId: string;
    login: string;
};

@injectable()
export class CryptoService implements ICryptoService {
    tokenOptions: { algo: string; expires: string };
    constructor(@inject(TYPES.ConfigService) private configService: ConfigService) {
        this.tokenOptions = {
            algo: this.configService.get('TOKEN_ALGO'),
            expires: this.configService.get('TOKEN_EXPIRES'),
        };
    }
    createAccessToken(payload: tokenPayload): string {
        return jwt.sign({ payload: payload }, this.configService.get('TOKEN_SALT'), {
            algorithm: 'HS512',
            expiresIn: this.configService.get('TOKEN_EXPIRES'),
        });
    }

    verifyAccessToken(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, this.configService.get('TOKEN_SALT'));
    }
}
