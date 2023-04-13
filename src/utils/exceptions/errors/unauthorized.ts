import HttpException from "./http.exception";
import { StatusCodes } from "http-status-codes"


class Unauthorized extends HttpException {
    public statusCode: number;

    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN
    }
}


export default Unauthorized;