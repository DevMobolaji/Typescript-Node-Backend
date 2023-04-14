import express, { Application } from "express";
import compression from "compression";
import cors from "cors";
import Controller from "@/utils/interfaces/controller.interface";
import helmet from "helmet";
import morgan from "morgan";
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import ErrorMiddleware from "@/middleware/error.middleware";
import { mongoConnect } from "@/misc/mongoConnect"
import session from "express-session"
import store from "@/misc/store"



class App {
    public express: Application;
    public port: number

    constructor(public controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeController(controllers);
        this.initializeErrorMiddleware();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan("dev"));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(xss());
        this.express.use(mongoSanitize());
        this.express.use(session(store))
    }

    private initializeController(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use("/api", controller.router)
        });
    }

    private initializeErrorMiddleware(): void {
        this.express.use(ErrorMiddleware);
    }

    private initializeDatabaseConnection(): void {
        //initialize mongodb connection
        mongoConnect()
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`)
        })
    }
}


export default App;

