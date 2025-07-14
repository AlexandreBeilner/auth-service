import { AuthService } from '../services/auth.service';
import { UsersRepository } from '../repositories/users.repository';
import { RefreshTokensRepository } from '../repositories/refreshTokens.repository';
import { Request, Response } from 'express';
import { ErrorHandler } from '../utils/errorHandler';
import { Cookie } from '../utils/cookie';
import { CookieKeys } from '../config/cookieKeys';
import { AuthTransportType } from '../middlewares/authTransportDetector.middleware';

class AuthController {
    private readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService(new UsersRepository(), new RefreshTokensRepository());
    }

    register = async (req: Request, res: Response) => {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).send({ id: user.id });
        } catch (error: any) {
            ErrorHandler.throw(error, res);
        }
    };

    login = async (req: Request, res: Response) => {
        const transport = (req as any).transport as AuthTransportType;

        const data = {
            ...req.body,
            rateLimitKey: (req as any).rateLimitKey,
            userAgent:
                transport == 'headers' ? req.headers['x-device-id'] : req.headers['user-agent'],
        };

        try {
            const login = await this.authService.login(data);
            if (transport === 'headers') {
                res.status(200).send({
                    refreshToken: login.refreshToken,
                    accessToken: login.accessToken,
                });
                return;
            }
            Cookie.set(res, CookieKeys.REFRESH_TOKEN, login.refreshToken);
            Cookie.set(res, CookieKeys.ACCESS_TOKEN, login.accessToken);
            res.status(200).send();
        } catch (e) {
            ErrorHandler.throw(e, res);
        }
    };

    refreshToken = async (req: Request, res: Response) => {
        const transport = (req as any).transport as 'headers' | 'cookies';
        try {
            const refreshToken =
                transport === 'headers'
                    ? (req.headers.authorization as string).split(' ')[1]
                    : Cookie.get(req, CookieKeys.REFRESH_TOKEN);

            const userAgent = (
                transport === 'headers' ? req.headers['x-device-id'] : req.headers['user-agent']
            ) as string;
            const response = await this.authService.refreshToken(refreshToken, userAgent);

            if (transport === 'headers') {
                res.status(200).send({
                    accessToken: response.accessToken,
                    refreshToken: response.refreshToken,
                });
                return;
            }

            Cookie.set(res, CookieKeys.REFRESH_TOKEN, response.refreshToken);
            Cookie.set(res, CookieKeys.ACCESS_TOKEN, response.accessToken);
            res.status(200).send();
            return;
        } catch (e) {
            ErrorHandler.throw(e, res);
        }
    };

    activateTwoFA = async (req: Request, res: Response) => {};

    verifyTwoFA = async (req: Request, res: Response) => {};

    logout(req: Request, res: Response) {}

    me(req: Request, res: Response) {}
}

export default new AuthController();
