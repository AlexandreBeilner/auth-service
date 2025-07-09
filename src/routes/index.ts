import {Router} from "express";
import {AuthRoute as AuthRouteWeb} from "./web/auth.route";
import {AuthRoute as AuthRouteMobile} from "./mobile/auth.route";
import {AuthRoute} from "./common/auth.route";

interface RouteType {
    endpoint: string;
    router: Router;
    middleware?: any
}
export const ROUTES: Array<RouteType> = [
    {endpoint: '/auth', router: (new AuthRoute()).init()},
    {endpoint: '/web/auth', router: (new AuthRouteWeb()).init()},
    {endpoint: '/mobile/auth', router: (new AuthRouteMobile()).init()}
]