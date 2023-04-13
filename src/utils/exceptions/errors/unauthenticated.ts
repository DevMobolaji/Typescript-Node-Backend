import HttpException from "./http.exception";
import { StatusCodes } from "http-status-codes"


class UnauthenticatedError extends HttpException {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}


export default UnauthenticatedError;