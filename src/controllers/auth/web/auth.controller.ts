import { Request, Response } from 'express';
import { AuthService } from '../../../services/auth.service';
import { UsersRepository } from '../../../repositories/users.repository';
import { RefreshTokensRepository } from '../../../repositories/refreshTokens.repository';
import { ErrorHandler } from '../../../utils/errorHandler';
import { Cookie } from '../../../utils/cookie';
import { CookieKeys } from '../../../config/cookieKeys';

class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService(new UsersRepository(), new RefreshTokensRepository());
    }

    login = async (req: Request, res: Response) => {
        try {
            const login = await this.authService.login(req.body, (req as any).rateLimitKey);
            Cookie.set(res, CookieKeys.REFRESH_TOKEN, login.refreshToken);
            Cookie.set(res, CookieKeys.ACCESS_TOKEN, login.accessToken);
            res.status(200).send();
        } catch (e) {
            ErrorHandler.throw(e, res);
        }
    };

    logout(req: Request, res: Response) {}

    me(req: Request, res: Response) {}

    refreshToken = async (req: Request, res: Response) => {
        try {
            const refreshToken = Cookie.get(req, CookieKeys.REFRESH_TOKEN);
            if (!refreshToken) {
                res.status(401).json({
                    message:
                        'A sessão expirou ou o token de atualização é inválido. Faça login novamente.',
                });
                return;
            }
            const response = await this.authService.refreshToken(refreshToken);
            Cookie.set(res, CookieKeys.REFRESH_TOKEN, response.refreshToken);
            Cookie.set(res, CookieKeys.ACCESS_TOKEN, response.accessToken);
            res.status(200).send();
        } catch (e) {
            ErrorHandler.throw(e, res);
        }
    };
}

export default new AuthController();
