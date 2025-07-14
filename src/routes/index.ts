import { NextFunction, Request, Response, Router } from 'express';
import { AuthRoute } from './auth.route';
import { AuthTransportDetectorMiddleware } from '../middlewares/authTransportDetector.middleware';

interface RouteType {
    endpoint: string;
    router: Router;
    middleware?: Array<(req: Request, res: Response, next: NextFunction) => void>;
}
export const ROUTES: Array<RouteType> = [
    {
        endpoint: '/auth',
        router: new AuthRoute().init(),
        middleware: [AuthTransportDetectorMiddleware.init],
    },
];
