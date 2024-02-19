import { Request, Response } from "express";
declare class BoardService {
    getBoards(req: Request, res: Response): Promise<void>;
    createBoards(req: Request, res: Response): Promise<void>;
}
declare const boardService: BoardService;
export default boardService;
//# sourceMappingURL=boards.service.d.ts.map