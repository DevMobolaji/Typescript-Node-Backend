import { Request, Response, NextFunction, Router } from "express";
import Controller from "utils/interfaces/controller.interface";
import HttpException from "utils/exceptions/http.exception";
import validate from "resources/post/post.validation"
import PostService from "./post.service";
import validationMiddleware from "middleware/validation.middleware";

class PostController implements Controller {
    public path = "/posts";
    public router = Router();
    private PostService = new PostService()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        )
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;

            const post = await this.PostService.create(title, body);

            res.status(200).json({ post })
        } catch (err) {
            next(new HttpException(400, "cannot create post"))
        }
    }
}

export default PostController