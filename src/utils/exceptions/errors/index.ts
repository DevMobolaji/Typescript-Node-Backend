import CustomAPIError from './http.exception';
import BadRequestError from "./badRequest";
import UnauthenticatedError from './unauthenticated';
import UnauthorizedError from './unauthorized';
import NotFoundError from './404';

export default {
    CustomAPIError,
    BadRequestError,
    UnauthenticatedError,
    UnauthorizedError,
    NotFoundError,
};