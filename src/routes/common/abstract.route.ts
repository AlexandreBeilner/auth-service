import {Router} from "express";

export abstract class AbstractRoute {
    protected readonly router: Router;
    constructor() {
        this.router = Router()
    }

    abstract init(): Router;
}