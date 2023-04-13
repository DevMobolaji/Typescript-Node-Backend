import User from "@/resources/Auth/auth.interface";

declare global {
    namespace Express {
        export interface Request {
            user: User
        }
    }
}