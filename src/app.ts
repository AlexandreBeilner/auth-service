import express, { Express } from 'express';
import { config } from './config/config';
import { database } from './config/database';
import { ROUTES } from './routes';

export class App {
    private app: Express;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        database.connect();
        this.routes();
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.clear();
            console.log('Running the server in the port ' + port);
        });
    }

    private routes(): void {
        ROUTES.forEach((r) => {
            if (r.middleware) {
                this.app.use(r.endpoint, r.middleware, r.router);
                return;
            }
            this.app.use(r.endpoint, r.router);
        });
    }
}

const app = new App();
app.listen(config.port);
