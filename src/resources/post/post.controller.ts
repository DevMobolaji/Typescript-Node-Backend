import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import validate from "@/resources/post/post.validation"
import PostService from "@/resources/post/post.service";
import validationMiddleware from "@/middleware/validation.middleware"
import HttpException from "@/utils/exceptions/errors/http.exception";

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
            return
        }
    }
}

export default PostController