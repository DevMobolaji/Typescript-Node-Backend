import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/misc/Token";
import userModel from "@/resources/Auth/auth.model";
import Token from "@/utils/interfaces/token.interface";
import jwt from "jsonwebtoken";
import CustomError from "@/utils/exceptions/errors"

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('bearer ')) {
        return next(new CustomError.UnauthenticatedError("User not authenticated"));
    }

    const accessToken = bearer.split("bearer ")[1].trim();

    try {
        const payload: jwt.VerifyErrors | Token = await verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new CustomError.UnauthenticatedError("User not authenticated"));
        }

        const user = await userModel.findById(payload.id).select("-password").exec();
        console.log(user)

        if (!user) {
            return next(new CustomError.UnauthenticatedError("User not authenticated"));
        }

        req.user = user
        return next()
    } catch (error) {

    }
}

export default authenticatedMiddleware 