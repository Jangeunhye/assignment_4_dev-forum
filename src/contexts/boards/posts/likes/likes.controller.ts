import { Router } from "express";
import authenticator from "../../../../middlewares/authenticator.middleware";
import likesService from "./likes.service";

const likesController = Router({ mergeParams: true });

likesController.get("/", authenticator, likesService.getLikes);

likesController.post("/", authenticator, likesService.createLike);
likesController.get("/:likeId", authenticator, likesService.getLike);

likesController.delete("/:likeId", authenticator, likesService.deleteLike);

export default likesController;
