// yarn add joi
import { Request, Response, NextFunction, RequestHandler } from "express";
import joi from "joi"

function validationMiddleware(schema: joi.Schema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        const validationOption = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOption
            );
            req.body = value;
            next();
        } catch (err) {
            const errors: string[] = [];
            (err as any).details.forEach((error: joi.ValidationErrorItem) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors })
        }
    }
}

export default validationMiddleware;