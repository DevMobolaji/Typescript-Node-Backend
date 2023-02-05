import token from "@/utils/Token";
import userModel from "./user.model";
import HttpException from "@/utils/exceptions/http.exception";

class UserService {
    private user = userModel;

    public async register(name: string, email: string, password: string, role: string): Promise<string | Error> {
        try {
            const user = await this.user.create({ name, email, password, role })
            const accessToken = token.createToken(user)

            return accessToken;
        } catch (err) {
            throw new Error("Unable to create user")
        }
    }

    public async login(email: string, password: string): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email })

            if (!user) {
                throw new Error("Unable to find user with that email Address")
            }

            if (!user.isVerified) {
                throw new HttpException(400, "Please confirm your email")
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error("Wrong credentials given")
            }
        } catch (err) {
            throw new Error("Unable to login user")
        }
    }

    public async getSingleUser(id: string) {
        try {
            const user = await this.user.findOne({ _id: id }).select("-password").exec()

            if (!user || !id) {
                throw new HttpException(401, `No user with id : ${id}`);
            }
        } catch (error) {
            throw new HttpException(400, "Unable to retrieve User")
        }
    }
}
/* Attempt to login the user*/

export default UserService;