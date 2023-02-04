import { Request, Response, NextFunction, Router } from "express";
import Controller from "utils/interfaces/controller.interface";
import HttpException from "utils/exceptions/http.exception";
import validationMiddleware from "middleware/validation.middleware";
import validate from "resources/user/user.validation";
import UserService from "./user.service"
import authenticatedMiddleware from "middleware/authenticated.middleware";

class UserController {
    public path = "/auth";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.Register),
            this.register
        );
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.Login),
            this.login);

        this.router.get(`${this.path}`, authenticatedMiddleware, this.getUser)
    };

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password, role } = req.body;

            const token = await this.UserService.register(name, email, password, "user");
            res.status(201).json({ token })
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;

            const token = await this.UserService.login(email, password);
            res.status(200).json({ token })
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    }

    private getUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) {
            return next(new HttpException(204, "No logged User"))
        }

        res.status(200).json({ user: req.user })
    }
}

export default UserController; 