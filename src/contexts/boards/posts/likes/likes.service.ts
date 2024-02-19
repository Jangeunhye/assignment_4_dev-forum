import { NextFunction, Request, Response } from "express";
import prismaClient from "../../../../prisma/client.prisma";

class LikesService {
  async getLikes(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const likes = await prismaClient.like.findMany({
        where: { postId: postId },
      });
      res.json(likes);
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async getLike(req: Request, res: Response) {
    try {
      const likeId = Number(req.params.likeId);
      const like = await prismaClient.like.findUnique({
        where: { id: likeId },
      });
      res.json(like);
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async createLike(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const userId = req.user.id.toString();

      const like = await prismaClient.like.create({
        data: { userId, postId },
      });
      res.json(like);
    } catch (e) {
      res.send(400);
    }
  }

  async deleteLike(req: Request, res: Response, next: NextFunction) {
    try {
      const likeId = Number(req.params.likeId);
      const like = await prismaClient.like.delete({
        where: { id: likeId },
      });
      res.json(like);
    } catch (e) {
      res.sendStatus(400);
    }
  }
}

const likesService = new LikesService();
export default likesService;
