import { NextFunction, Request, Response } from "express"
import HttpException from "@/utils/exceptions/errors/http.exception"
import CustomError from "@/utils/exceptions/errors"

function authorizedRole(...roles: string[]) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        if (!roles.includes(req.user.roles)) {
            throw new CustomError.BadRequestError("Please verify your email")
        }
        next()
    }
}

export default authorizedRole