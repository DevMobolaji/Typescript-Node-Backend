import 'dotenv/config'
import 'module-alias/register'
import validateEnvVariables from '@/configs/validateEnv';
import App from '@/loaders/app';
import AuthController from '@/services/AuthServices/auth.controller';
import PostController from '@/services/PostService/post.controller';


validateEnvVariables();

const app = new App([new PostController(), new AuthController()],
    Number(process.env.PORT))

const start = async () => {
    await app.initializeDatabaseConnection();
    app.listen()
}

start()