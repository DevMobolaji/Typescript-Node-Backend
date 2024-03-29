// yarn add envalid
import { cleanEnv, str, port } from 'envalid'


function validateEnvVariables(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        PORT: port({ default: 3000 }),
        JWT_SECRET: str(),
        SESSION_NAME: str(),
        SESSION_SECRET: str()
    })
}

export default validateEnvVariables;