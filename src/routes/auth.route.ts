import { AbstractRoute } from './abstract.route';
import { DataValidatorMiddleware } from '../middlewares/dataValidator.middleware';
import { AuthValidator } from '../validators/auth.validator';
import AuthController from '../controllers/auth.controller';
import { LoginRateLimiterMiddleware } from '../middlewares/loginRateLimiter.middleware';
import { TokenValidatorMiddleware } from '../middlewares/tokenValidator.middleware';

export class AuthRoute extends AbstractRoute {
    init() {
        this.router.post(
            '/register',
            DataValidatorMiddleware.validateBody(AuthValidator.register()),
            AuthController.register
        );
        this.router.post(
            '/login',
            DataValidatorMiddleware.validateBody(AuthValidator.login()),
            LoginRateLimiterMiddleware.init,
            AuthController.login
        );
        this.router.post(
            '/refresh-token',
            TokenValidatorMiddleware.init('refresh'),
            AuthController.refreshToken
        );
        this.router.post(
            '/activate-2fa',
            TokenValidatorMiddleware.init('access'),
            AuthController.activateTwoFA
        );
        // this.router.get('/me', AuthController.me);
        return this.router;
    }
}
