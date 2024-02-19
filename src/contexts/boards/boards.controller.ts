import { Router } from "express";
import boardService from "./boards.service";
import postsController from "./posts/posts.controller";

const boardsController = Router();

boardsController.get("/", boardService.getBoards);
boardsController.post("/", boardService.createBoards);

boardsController.use("/:boardId/posts", postsController);

export default boardsController;
