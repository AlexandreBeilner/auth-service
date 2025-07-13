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
    
    login(req: Request, res: Response) {}

    logout(req: Request, res: Response) {}

    me(req: Request, res: Response) {}
}

export default new AuthController();
