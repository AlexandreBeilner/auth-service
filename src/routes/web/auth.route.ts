import { AbstractRoute } from '../common/abstract.route';
import AuthController from '../../controllers/auth/web/auth.controller';
import {DataValidatorMiddleware} from "../../middlewares/dataValidator.middleware";
import {AuthValidator} from "../../validators/auth.validator";

export class AuthRoute extends AbstractRoute {
    init() {
        this.router.post('/login', DataValidatorMiddleware.validateBody(AuthValidator.login()), AuthController.login);
        this.router.post('/logout', AuthController.logout);
        this.router.get('/me', AuthController.me);
        return this.router;
    }
}
