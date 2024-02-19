import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class BoardService {
  async getBoards(req: Request, res: Response) {
    try {
      const board = await prismaClient.board.findMany();
      res.send(board);
    } catch (e) {
      res.sendStatus(404);
    }
  }
  async createBoards(req: Request, res: Response) {
    const { name } = req.body;
    try {
      const board = await prismaClient.board.create({
        data: {
          name,
        },
      });
      res.json(board);
    } catch (e) {
      res.sendStatus(400);
    }
  }
}

const boardService = new BoardService();
export default boardService;
