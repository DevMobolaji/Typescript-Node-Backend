import HttpException from "./http.exception";
import { StatusCodes } from "http-status-codes"


class NotFound extends HttpException {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND
    }
}


export default NotFound;