import token from "utils/Token";
import userModel from "./user.model";

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

            if (await user.isValidPassword(password)) {
                return token.createToken(user)
            } else {
                throw new Error("Wrong credentials given")
            }
        } catch (err) {
            throw new Error("Unable to login user")
        }
    }
}
/* Attempt to login the user*/


export default UserService;