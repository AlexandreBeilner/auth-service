import {NextFunction,Request, Response} from "express";
import {redis} from "../config/redis";

const MAX_ATTEMPTS = 5;

export class LoginRateLimiterMiddleware {
    static async init(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;

        const key = `login_attempt:${email}`;
        const attempts = await redis.get(key);
        const attemptsCount = Number(attempts || 0);
        if (attemptsCount >= MAX_ATTEMPTS) {
            res.status(429).json({
                message: 'Muitas tentativas de login. Tente novamente em alguns minutos.',
            });
            return;
        }
        (req as any).rateLimitKey = key;

        next();
    }
}