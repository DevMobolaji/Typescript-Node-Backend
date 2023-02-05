import { NextFunction, Request, Response } from "express"
import HttpException from "@/utils/exceptions/http.exception"

function authorizedRole(...roles: string[]) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        if (!roles.includes(req.user.roles)) {
            throw new HttpException(400, "you're not authorized")
        }
        next()
    }
}

export default authorizedRole