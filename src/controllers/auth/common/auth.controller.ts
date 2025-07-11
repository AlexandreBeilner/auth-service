import { Request, Response } from 'express';

class AuthController {
    register(req: Request, res: Response) {
        console.log(req)
        res.status(201).send()
    }
}

export default new AuthController();
