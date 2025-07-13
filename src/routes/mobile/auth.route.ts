import { AbstractRoute } from '../common/abstract.route';
import AuthController from '../../controllers/auth/mobile/auth.controller';
import { AuthValidator } from '../../validators/auth.validator';
import { DataValidatorMiddleware } from '../../middlewares/dataValidator.middleware';
import {LoginRateLimiterMiddleware} from "../../middlewares/loginRateLimiter.middleware";

export class AuthRoute extends AbstractRoute {
    init() {
        this.router.post(
            '/login',
            DataValidatorMiddleware.validateBody(AuthValidator.login()),
            LoginRateLimiterMiddleware.init,
            AuthController.login
        );
        this.router.post('/refresh-token', AuthController.refreshToken);
        this.router.get('/me', AuthController.me);
        return this.router;
    }
}
