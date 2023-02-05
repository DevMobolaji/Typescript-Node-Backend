import { Request } from "express";
import HttpException from "utils/exceptions/http.exception";

async function checkPermission(req: any, userId: string): Promise<boolean> {
    if (req.roles === "Admin") return true;
    if (req.userId === userId.toString()) return true;

    throw new HttpException(400, "not Authorized")
}

export default checkPermission