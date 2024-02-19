import { NextFunction, Request, Response } from "express";
import prismaClient from "../../../prisma/client.prisma";

class PostsService {
  async getPosts(req: Request, res: Response) {
    try {
      const boardId = Number(req.params.boardId);

      const posts = await prismaClient.post.findMany({
        where: { boardId: boardId },
        orderBy: { createdAt: "desc" }, // 최신 게시물부터 정렬
      });
      res.json(posts);
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async getPost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const post = await prismaClient.post.findUnique({
        where: { id: postId },
      });
      res.json(post);
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async createPost(req: Request, res: Response) {
    try {
      const boardId = Number(req.params.boardId);

      const { title, content } = req.body;
      const userId = req.user.id.toString();

      const post = await prismaClient.post.create({
        data: { title, content, userId, boardId },
      });
      res.json(post);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  async updatePost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const boardId = Number(req.params.boardId);
      const { title, content } = req.body;
      const updatedPost = await prismaClient.post.update({
        where: {
          id: postId,
          boardId: boardId,
        },
        data: {
          title,
          content,
        },
      });

      res.json(updatedPost);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = Number(req.params.postId);
      const post = await prismaClient.post.delete({
        where: { id: postId },
      });
      res.json(post);
    } catch (e) {
      res.sendStatus(400);
    }
  }
}

const postsService = new PostsService();
export default postsService;
