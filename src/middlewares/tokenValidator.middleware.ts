import { NextFunction, Request, Response } from 'express';
import { AuthMessage } from '../messages/auth.message';
import { Jwt } from '../utils/jwt';
import { Cookie } from '../utils/cookie';
import { CookieKeys } from '../config/cookieKeys';

type TokenTypes = 'access' | 'refresh';
export class TokenValidatorMiddleware {
    static init(tokenType: TokenTypes) {
        return (req: Request, res: Response, next: NextFunction) => {
            if ((req as any).transport === 'headers') {
                this.validByHeader(tokenType, req, res, next);
                return;
            }
            this.validByCookie(tokenType, req, res, next);
        };
    }

    private static validByHeader(
        tokenType: TokenTypes,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization ?? '';
        const [bearer, jwt] = token?.split(' ');
        if (bearer !== 'Bearer') {
            res.send(401).json({
                message:
                    tokenType === 'refresh'
                        ? AuthMessage.INVALID_REFRESH_TOKEN
                        : AuthMessage.INVALID_ACCESS_TOKEN,
            });
            return;
        }
        const verifyFunc = {
            access: Jwt.verifyAccessToken,
            refresh: Jwt.verifyRefreshToken,
        };
        try {
            const data = verifyFunc[tokenType](jwt);
            (req as any).userId = data.userId;
        } catch (e) {
            res.send(401).json({
                message:
                    tokenType === 'refresh'
                        ? AuthMessage.INVALID_REFRESH_TOKEN
                        : AuthMessage.INVALID_ACCESS_TOKEN,
            });
            return;
        }
        next();
    }

    private static validByCookie(
        tokenType: TokenTypes,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const token = Cookie.get(
            req,
            tokenType === 'refresh' ? CookieKeys.REFRESH_TOKEN : CookieKeys.ACCESS_TOKEN
        );
        if (!token) {
            res.send(401).json({
                message:
                    tokenType === 'refresh'
                        ? AuthMessage.INVALID_REFRESH_TOKEN
                        : AuthMessage.INVALID_ACCESS_TOKEN,
            });
            return;
        }
        const verifyFunc = {
            access: Jwt.verifyAccessToken,
            refresh: Jwt.verifyRefreshToken,
        };
        try {
            const data = verifyFunc[tokenType](token);
            (req as any).userId = data.userId;
        } catch (e) {
            res.send(401).json({
                message:
                    tokenType === 'refresh'
                        ? AuthMessage.INVALID_REFRESH_TOKEN
                        : AuthMessage.INVALID_ACCESS_TOKEN,
            });
            return;
        }
        next();
    }
}
