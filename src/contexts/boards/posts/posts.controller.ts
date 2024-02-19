import { Router } from "express";
import authenticator from "../../../middlewares/authenticator.middleware";
import commentsController from "./comments/comments.controller";
import likesController from "./likes/likes.controller";
import postsService from "./posts.service";

const postsController = Router({ mergeParams: true });

//posts
postsController.get("/", authenticator, postsService.getPosts);

postsController.post("/", authenticator, postsService.createPost);
postsController.get("/:postId", authenticator, postsService.getPost);
postsController.put("/:postId", authenticator, postsService.updatePost);

postsController.delete("/:postId", authenticator, postsService.deletePost);

//comments
postsController.use("/:postId/comments", commentsController);

//likes
postsController.use("/:postId/likes", likesController);
export default postsController;
