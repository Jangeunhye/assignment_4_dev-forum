import { NextFunction, Request, Response } from "express";
declare class CommentsService {
    getComments(req: Request, res: Response): Promise<void>;
    getComment(req: Request, res: Response): Promise<void>;
    createComment(req: Request, res: Response): Promise<void>;
    updateComment(req: Request, res: Response): Promise<void>;
    deleteComment(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const commentsService: CommentsService;
export default commentsService;
//# sourceMappingURL=comments.service.d.ts.map