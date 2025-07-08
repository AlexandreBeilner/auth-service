import express, { Express } from 'express';
import {config} from "./config/config";
import {database} from "./config/database";

export class App {
    private app: Express;

    constructor() {
        this.app = express();
        database.connect()
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.clear();
            console.log('Running the server in the port ' + port);
        });
    }
}

const app = new App();
app.listen(config.port);