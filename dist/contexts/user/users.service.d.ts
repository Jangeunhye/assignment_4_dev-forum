import { Request, Response } from "express";
declare class UsersService {
    getLikes(req: Request, res: Response): Promise<void>;
    getPosts(req: Request, res: Response): Promise<void>;
}
declare const usersService: UsersService;
export default usersService;
//# sourceMappingURL=users.service.d.ts.map