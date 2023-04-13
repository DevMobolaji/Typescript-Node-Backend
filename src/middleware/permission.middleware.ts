import { Request } from "express";
import HttpException from "@/utils/exceptions/errors/http.exception";
import CustomError from "@/utils/exceptions/errors"

async function checkPermission(req: any, userId: string): Promise<boolean> {
    if (req.roles === "Admin") return true;
    if (req.userId === userId.toString()) return true;

    throw new CustomError.BadRequestError("Please verify your email")
}

export default checkPermission