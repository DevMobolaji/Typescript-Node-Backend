import postModel from "@/services/PostService/post.model"
import Post from "@/services/PostService/post.interface"

class PostService {
    private post = postModel;

    public async create(title: string, body: string): Promise<Post> {
        try {
            const post = this.post.create({ title, body })
            return post
        } catch (err) {
            throw new Error("unable to create post")
        }
    }
}

export default PostService;