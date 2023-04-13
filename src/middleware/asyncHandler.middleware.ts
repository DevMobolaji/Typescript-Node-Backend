import { Request, Response, NextFunction } from "express";

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next))
        .catch(next);
};

export default asyncHandler