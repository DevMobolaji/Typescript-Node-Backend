import { Request, Response, NextFunction } from "express";
import HttpException from "utils/exceptions/http.exception"

async function ErrorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    const status = error.statusCode || 500;
    const message = error.message || "Something went wrong"

    res.status(status).send({
        status,
        message
    })
}

export default ErrorMiddleware;