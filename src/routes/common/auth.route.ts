import { AbstractRoute } from './abstract.route';
import AuthController from '../../controllers/auth/common/auth.controller';
import { DataValidatorMiddleware } from '../../middlewares/dataValidator.middleware';
import { AuthValidator } from '../../validators/auth.validator';

export class AuthRoute extends AbstractRoute {
    init() {
        this.router.post(
            '/register',
            DataValidatorMiddleware.validateBody(AuthValidator.register()),
            AuthController.register
        );
        return this.router;
    }
}
