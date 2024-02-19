import { NextFunction, Request, Response } from "express";
declare class PostsService {
    getPosts(req: Request, res: Response): Promise<void>;
    getPost(req: Request, res: Response): Promise<void>;
    createPost(req: Request, res: Response): Promise<void>;
    updatePost(req: Request, res: Response): Promise<void>;
    deletePost(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const postsService: PostsService;
export default postsService;
//# sourceMappingURL=posts.service.d.ts.map