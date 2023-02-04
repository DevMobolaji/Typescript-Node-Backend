import { Request, Response, NextFunction, Router } from "express";
import { verifyToken } from "utils/Token";
import userModel from "resources/user/user.model";
import Token from "utils/interfaces/token.interface";
import HttpException from "utils/exceptions/http.exception";
import jwt from "jsonwebtoken";

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('bearer ')) {
        return next(new HttpException(401, "Unauthorized"))
    }

    const accessToken = bearer.split("bearer ")[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, "Unauthorized"))
        }

        const user = await userModel.findById(payload.id).select("-password").exec();

        if (!user) {
            return next(new HttpException(401, "Unauthorized"))
        }

        req.user = user
        return next()
    } catch (error) {

    }
}

export default authenticatedMiddleware