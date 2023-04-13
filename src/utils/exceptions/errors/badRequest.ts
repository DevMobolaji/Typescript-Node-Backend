import HttpException from "./http.exception";
import { StatusCodes } from "http-status-codes"


class badRequest extends HttpException {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default badRequest