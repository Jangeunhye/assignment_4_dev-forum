import { Router } from "express";
import authenticator from "../../../../middlewares/authenticator.middleware";
import commentsService from "./comments.service";

const commentsController = Router({ mergeParams: true });

commentsController.get("/", authenticator, commentsService.getComments);

commentsController.post("/", authenticator, commentsService.createComment);
commentsController.get(
  "/:commentId",
  authenticator,
  commentsService.getComment
);
commentsController.put(
  "/:commentId",
  authenticator,
  commentsService.updateComment
);

commentsController.delete(
  "/:commentId",
  authenticator,
  commentsService.deleteComment
);

export default commentsController;
