import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class HomeService {
  async getPosts(req: Request, res: Response) {
    try {
      // 게시판 ID들을 조회
      const boards = await prismaClient.board.findMany({
        select: { id: true },
      });

      // 각 게시판별로 최신 게시물을 조회
      const postsPromises = boards.map((board) =>
        prismaClient.post.findMany({
          where: { boardId: board.id },
          orderBy: { createdAt: "desc" }, // 최신 게시물부터 정렬
          take: 10, // 각 게시판별로 최신 10개 게시물만 가져옴
        })
      );

      const postsByBoard = await Promise.all(postsPromises);

      const response = boards.map((board, index) => ({
        boardId: board.id,
        posts: postsByBoard[index],
      }));

      res.json(response);
    } catch (e) {
      res.sendStatus(404);
    }
  }
}

const homeService = new HomeService();
export default homeService;
