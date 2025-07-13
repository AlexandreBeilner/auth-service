import { Request, Response } from 'express';
import { AuthService } from '../../../services/auth.service';
import { ErrorHandler } from '../../../utils/errorHandler';
import { UsersRepository } from '../../../repositories/users.repository';
import { RefreshTokensRepository } from '../../../repositories/refreshTokens.repository';

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
}

export default new AuthController();
