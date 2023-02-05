import 'dotenv/config'
import 'module-alias/register'
import App from "./app";
import PostController from 'resources/post/post.controller';
import UserController from 'resources/user/user.controller';
import validateEnvVariables from 'utils/validateEnv';

validateEnvVariables();

// const app = new App([
//     //new PostController(),
//     new UserController()
// ], Number(process.env.PORT))

const app = new App([
    new PostController(),
    new UserController()],
    Number(process.env.PORT))

app.listen()