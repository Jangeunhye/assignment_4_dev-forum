import { NextFunction, Request, Response } from "express";
declare class LikesService {
    getLikes(req: Request, res: Response): Promise<void>;
    getLike(req: Request, res: Response): Promise<void>;
    createLike(req: Request, res: Response): Promise<void>;
    deleteLike(req: Request, res: Response, next: NextFunction): Promise<void>;
}
declare const likesService: LikesService;
export default likesService;
//# sourceMappingURL=likes.service.d.ts.map