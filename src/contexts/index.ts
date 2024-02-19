import { Router } from "express";
import authenticator from "../middlewares/authenticator.middleware";
import authController from "./auth/auth.controller";
import boardsController from "./boards/boards.controller";
import homeController from "./home/home.controller";
import usersController from "./user/users.controller";

const controllers = Router();

controllers.use("/", homeController);
controllers.use("/auth", authController);
controllers.use("/boards", boardsController);
controllers.use("/users", authenticator, usersController);
export default controllers;
