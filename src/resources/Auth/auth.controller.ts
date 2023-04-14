import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/Auth/auth.validation";
import UserService from "@/resources/Auth/auth.service"
import authorizedRole from "@/middleware/authorizedRole.middleware"
import authenticatedMiddleware from "@/middleware/authenticated.middleware";
import asyncHandler from "@/middleware/asyncHandler.middleware";
import checkPermission from "middleware/permission.middleware";
import CustomError from "@/utils/exceptions/errors"
import { redis } from "@/misc/redis";
import { userSessionIdPrefix } from "misc/constants";


class AuthController implements Controller {
    public path = "/auth";
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.Register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.Login),
            this.login);

        this.router.get(`${this.path}/alluser`, authenticatedMiddleware, authorizedRole("Admin"), this.getUser)
        this.router.get(`${this.path}/:id`, authenticatedMiddleware, authorizedRole("Admin"), this.getSingleUser)
    };

    private register = asyncHandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { name, email, password } = req.body;

        const token = await this.UserService.register(name, email, password);
        res.status(201).json({ token })
    })

    private login = asyncHandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const { email, password } = req.body;

        const token = await this.UserService.login(email, password);

        const { userId, userRole } = token;
        req.session.userId = userId;
        req.session.role = userRole;

        if (req.sessionID) {
            await redis.lpush(`${userSessionIdPrefix}${userId}`, req.sessionID)
        }

        res.status(200).json({ token })
    })

    private getUser = asyncHandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        console.log(req)
        if (!req.user) {
            return next(new CustomError.BadRequestError("No logged in user"));
        }

        res.status(200).json({ user: req.user })
    })

    private getSingleUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<any> => {
        try {
            const user = await this.UserService.getSingleUser(req.params.id);
            console.log(user)

            //checkPermission(req.user, (user._id as any))
            res.status(200).json({ user: req.user })
        } catch (err: any) {
            next(new CustomError.BadRequestError(err.message));
        }

    }

}

export default AuthController; 