import * as bodyParser from 'body-parser';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import * as express from 'express';

import { CalculatorRoute } from './routes/calculator';
import { IndexRoute } from './routes/index';

class App {

    public app: express.Application;
    public port: number;
    public IndexRoute: IndexRoute = new IndexRoute();
    public CalculatorRoute: CalculatorRoute = new CalculatorRoute();

    constructor() {
        this.app = express();
        this.port = 3000;
        this.initializeMiddlewares();
        this.initializeRoutes();

    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(expressWinston.logger({
            transports: [
                new winston.transports.Console()
            ],
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.json()
            )
        }));
        this.app.use(express.json());
    }

    private initializeRoutes() {
        this.CalculatorRoute.routes(this.app);
        this.IndexRoute.routes(this.app);
    }
}
export default new App().app;