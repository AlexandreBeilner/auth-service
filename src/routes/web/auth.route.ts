import {AbstractRoute} from "../common/abstract.route";
import AuthController from "../../controllers/auth/web/auth.controller";

export class AuthRoute extends AbstractRoute {
    init() {
        this.router.post('/login', AuthController.login);
        this.router.post('/logout', AuthController.logout);
        this.router.get('/me', AuthController.me);
        return this.router;
    }
}