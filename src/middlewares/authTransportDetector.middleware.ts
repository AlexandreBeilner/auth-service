import { NextFunction, Request, Response } from 'express';

export type AuthTransportType = 'headers' | 'cookies';

export class AuthTransportDetectorMiddleware {
    static init(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization || req.headers['x-device-id']) {
            (req as any).transport = 'headers';
        } else {
            (req as any).transport = 'cookies';
        }
        next();
    }
}
