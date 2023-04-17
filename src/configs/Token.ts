import Token from "@/interfaces/token.interface";
import User from "@/services/AuthServices/auth.interface";
import jwt from "jsonwebtoken";


export const createToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '15m',
    })
}

export const refreshToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    })
}


export const verifyToken = async (token: string): Promise<jwt.VerifyErrors | Token> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.jwt_SECRET as jwt.Secret, (err, payload) => {
            if (err) return reject(err)

            resolve(payload as Token)
        })
    })
}

export const refresh = async (token: string, user: User) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.jwt_SECRET as jwt.Secret, (err, decoded) => {
            if (err) return reject(err)

            createToken(user)
        })
    })
}

export default { createToken, verifyToken, refreshToken }