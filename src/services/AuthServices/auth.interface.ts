import { Document } from "mongoose";

export default interface User extends Document {
    email: string;
    password: string;
    roles: string;
    name: string;
    isVerified: boolean;

    isValidPassword(password: string): Promise<Error | boolean>
}