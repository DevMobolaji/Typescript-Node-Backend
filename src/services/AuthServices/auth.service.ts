
import userModels from "@/services/AuthServices/auth.model";
import CustomError from "@/utils/exceptions/errors"
import token from "@/configs/Token"

class UserService {
    private user = userModels;

    // Logic for registering a new User
    public async register(name: string, email: string, password: string) {
        const userAlredyExists = await this.user.findOne({ email })

        if (userAlredyExists) {
            throw new CustomError.BadRequestError("User with that email already exist")
        }
        const user = await this.user.create({ name, email, password })

        const { email: userEmail, name: userName, isVerified: userVerified, roles: userRole } = user

        return {
            userEmail,
            userName,
            userVerified,
            userRole
        };
    }

    // Logic for login in a new User
    public async login(email: string, password: string) {
        const user = await this.user.findOne({ email })

        if (!user) {
            throw new CustomError.BadRequestError("Unable to find user with that email address")
        }

        // if (!user.isVerified) {
        //     throw new CustomError.BadRequestError("Please verify your email")
        // }
        const validPass = await user.isValidPassword(password)

        if (!validPass) {
            throw new CustomError.BadRequestError("wrong credentials given")
        }

        const accessToken = token.createToken(user)
        const refreshToken = token.refreshToken(user)

        user.refreshToken = refreshToken;
        const result = await user.save()


        const { email: userEmail, name: userName, roles: userRole } = result
        return {
            accessToken,
            refreshToken,
            userEmail,
            userName,
            userRole
        }
    }

    public async refreshToken(cookies: any) {
        if (!cookies) {
            throw new CustomError.UnauthenticatedError("Uauthenticated")
        }

        const refreshToken = cookies.jwt

        const foundUser = await this.user.findOne({ refreshToken })
        if (!foundUser) throw new CustomError.UnauthorizedError("Unauthorized")

        await refresh(refreshToken, foundUser)
    }

    public async getSingleUser(id: string) {
        const user = await this.user.findOne({ _id: id }).select("-password").exec()

        if (!user || !id) {
            throw new CustomError.UnauthenticatedError("Please verify your email")
        }
    }
}
/* Attempt to login the user*/

export default UserService;

