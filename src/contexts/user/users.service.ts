import { Request, Response } from "express";
import prismaClient from "../../prisma/client.prisma";

class UsersService {
  async getLikes(req: Request, res: Response) {
    const userId = req.user.id.toString();
    //userId 별 like의 postId 가져오기

    try {
      const likes = await prismaClient.like.findMany({
        where: { userId },
        select: { postId: true },
      });

      // likes 배열에서 postId만 추출
      const postIds = likes.map((like) => like.postId);

      // Post 테이블에서 해당 postId에 해당하는 모든 게시물 정보를 조회
      const posts = await prismaClient.post.findMany({
        where: {
          id: { in: postIds }, // postId 리스트에 포함된 postId들로 조회
        },
      });
      res.json(posts); // 조회된 게시물 정보 반환
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async getPosts(req: Request, res: Response) {
    const userId = req.user.id.toString();

    try {
      const posts = await prismaClient.post.findMany({
        where: { userId },
      });
      res.json(posts);
    } catch (e) {
      res.sendStatus(404);
    }
  }
}

const usersService = new UsersService();
export default usersService;
