import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";
import User from "@/services/AuthServices/auth.interface";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    roles: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
    },
    refreshToken: {
        type: String
    },
}, { timestamps: true }
)

userSchema.pre<User>("save", async function (next) {
    if (!this.isModified("password")) {
        return next()
    }

    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next()
});

userSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
    return await bcryptjs.compare(password, this.password)
}


export default model<User>("User", userSchema)
