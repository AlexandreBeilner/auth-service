import { Request, Response } from 'express';
import {AuthService} from "../../../services/auth.service";
import {UsersRepository} from "../../../repositories/users.repository";

class AuthController {
    private authService: AuthService;
    constructor() {
        this.authService = new AuthService(
            new UsersRepository()
        )
    }

    login = async (req: Request, res: Response)=> {
        const login = await this.authService.login(req.body)
    }

    refreshToken(req: Request, res: Response) {}

    me(req: Request, res: Response) {}
}

export default new AuthController();
