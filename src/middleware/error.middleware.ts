import { Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

async function ErrorMiddleware(
    error: any,
    _req: Request,
    res: Response,
    _next: NextFunction): Promise<Response<any, Record<string, any>>> {

    let customError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || "Something went wrong",

        success: false
    }

    if (error.name === 'ValidationError') {
        customError.message = Object.values(error.errors).map((item: any) => item.message).join(', ');
        customError.statusCode = 400
    }
    if (error.code && error.code === 11000) {
        customError.message = `Duplicate value entered for ${Object.keys(error.keyValue)} field choose another value`;
        customError.statusCode = 400
    }
    if (error.name === 'castError') {
        customError.message = `No item found with id : ${error.value}`
        customError.statusCode = 404
    }


    return res.status(customError.statusCode).json({
        message: customError.message
    })
}

export default ErrorMiddleware;