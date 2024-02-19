import { NextFunction, Request, Response } from "express";
import prismaClient from "../../../../prisma/client.prisma";

class CommentsService {
  async getComments(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const comments = await prismaClient.comment.findMany({
        where: { postId: postId },
      });
      res.json(comments);
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async getComment(req: Request, res: Response) {
    try {
      const commentId = Number(req.params.commentId);
      const comment = await prismaClient.comment.findUnique({
        where: { id: commentId },
      });
      res.json(comment);
    } catch (e) {
      res.sendStatus(404);
    }
  }

  async createComment(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);

      const { content } = req.body;
      const userId = req.user.id.toString();

      const comment = await prismaClient.comment.create({
        data: { content, userId, postId },
      });
      res.json(comment);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  async updateComment(req: Request, res: Response) {
    try {
      const commentId = Number(req.params.commentId);
      const { content } = req.body;
      const updateComment = await prismaClient.comment.update({
        where: {
          id: commentId,
        },
        data: {
          content,
        },
      });

      res.json(updateComment);
    } catch (e) {
      res.sendStatus(400);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      const commentId = Number(req.params.commentId);
      const comment = await prismaClient.comment.delete({
        where: { id: commentId },
      });
      res.json(comment);
    } catch (e) {
      res.sendStatus(400);
    }
  }
}

const commentsService = new CommentsService();
export default commentsService;
