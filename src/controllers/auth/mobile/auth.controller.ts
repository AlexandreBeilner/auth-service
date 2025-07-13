import { Request, Response } from 'express';
import { AuthService } from '../../../services/auth.service';
import { UsersRepository } from '../../../repositories/users.repository';
import { RefreshTokensRepository } from '../../../repositories/refreshTokens.repository';
import { ErrorHandler } from '../../../utils/errorHandler';

class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService(new UsersRepository(), new RefreshTokensRepository());
    }

    login = async (req: Request, res: Response) => {
        try {
            const login = await this.authService.login(req.body, (req as any).rateLimitKey);
            res.status(200).send({
                refreshToken: login.refreshToken,
                accessToken: login.accessToken,
            });
        } catch (e) {
            ErrorHandler.throw(e, res);
        }
    };

    refreshToken = async (req: Request, res: Response) => {
        try {
            const refreshToken = req.headers.authorization;
            if (!refreshToken || !refreshToken.startsWith('Bearer ')) {
                res.status(401).json({
                    message:
                        'A sessão expirou ou o token de atualização é inválido. Faça login novamente.',
                });
                return;
            }
            const response = await this.authService.refreshToken(refreshToken);
            res.status(200).send({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
            });
        } catch (e) {
            ErrorHandler.throw(e, res);
        }
    };

    me(req: Request, res: Response) {}
}

export default new AuthController();
