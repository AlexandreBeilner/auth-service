import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export type JwtPayload = {
    userId: string;
};

export class Jwt {
    static generateAccessToken(payload: JwtPayload) {
        return jwt.sign(payload, config.jwt.access, { expiresIn: config.jwt.accessExpiresIn });
    }

    static generateRefreshToken(payload: JwtPayload) {
        return jwt.sign(payload, config.jwt.refresh, {
            expiresIn: config.jwt.refreshExpiresIn,
        });
    }

    static verifyAccessToken(token: string) {
        return jwt.verify(token, config.jwt.access) as JwtPayload;
    }

    static verifyRefreshToken(token: string) {
        return jwt.verify(token, config.jwt.refresh) as JwtPayload;
    }
}
