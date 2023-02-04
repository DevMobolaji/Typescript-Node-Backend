import { Document } from "mongoose";

export default interface User extends Document {
    email: string;
    password: string;
    role: string;
    name: string;

    isValidPassword(password: string): Promise<Error | boolean>
}