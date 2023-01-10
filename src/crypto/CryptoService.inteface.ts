import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';

export interface ICryptoService {
    createAccessToken(payload: any): string;
    verifyAccessToken(token: string): string | jwt.JwtPayload;
    decodeAccessToken(token: string): null | jwt.JwtPayload;
}
