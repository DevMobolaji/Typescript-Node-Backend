import token from "@/misc/Token";
import userModels from "@/resources/Auth/auth.model";
import CustomError from "@/utils/exceptions/errors"

class UserService {
    private user = userModels;

    public async register(name: string, email: string, password: string) {
        const userAlredyExists = await this.user.findOne({ email })

        if (userAlredyExists) {
            throw new CustomError.BadRequestError("User with that email already exist")
        }
        const user = await this.user.create({ name, email, password })
        const accessToken = token.createToken(user)

        const { email: userEmail, name: userName, isVerified: userVerified, roles: userRole } = user

        return {
            accessToken,
            userEmail,
            userName,
            userVerified,
            userRole
        };
    }

    public async login(email: string, password: string) {
        const user = await this.user.findOne({ email })

        if (!user) {
            throw new CustomError.BadRequestError("Unable to find user with that email address")
        }

        if (!user.isVerified) {
            throw new CustomError.BadRequestError("Please verify your email")
        }
        const validPass = await user.isValidPassword(password)

        if (!validPass) {
            throw new CustomError.BadRequestError("wrong credentials given")
        }
        const userToken = token.createToken(user)
        const { id: userId, email: userEmail, name: userName, isVerified: userVerified, roles: userRole } = user
        return {
            userToken,
            userEmail,
            userName,
            userVerified,
            userRole,
            userId
        }
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

