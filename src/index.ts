import 'dotenv/config'
import 'module-alias/register'
import App from "./app";
import PostController from '@/resources/post/post.controller';
import validateEnvVariables from '@/utils/validateEnv';
import AuthController from '@/resources/Auth/auth.controller';

validateEnvVariables();

const app = new App([
    new PostController(),
    new AuthController()],
    Number(process.env.PORT))

app.listen()