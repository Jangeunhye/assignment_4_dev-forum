import { Router } from "express";
import usersService from "./users.service";

const usersController = Router();
usersController.get("/posts", usersService.getPosts);
usersController.get("/likes", usersService.getLikes);

export default usersController;
