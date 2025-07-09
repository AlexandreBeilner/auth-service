import {AbstractRoute} from "./abstract.route";
import AuthController from "../../controllers/auth/common/auth.controller";

export class AuthRoute extends AbstractRoute {
    init() {
        this.router.post('/create-account', AuthController.createAccount)
        return this.router;
    }
}