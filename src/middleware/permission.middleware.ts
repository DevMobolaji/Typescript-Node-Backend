import { Request } from "express";
import CustomError from "@/utils/exceptions/errors"

async function checkPermission(req: Request, userId: string): Promise<boolean> {
    if (req.roles === "Admin") return true;
    if (req.user._id === userId.toString()) return true;

    throw new CustomError.BadRequestError("Please verify your email")
}

export default checkPermission