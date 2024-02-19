"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const boards_service_1 = __importDefault(require("./boards.service"));
const posts_controller_1 = __importDefault(require("./posts/posts.controller"));
const boardsController = (0, express_1.Router)();
boardsController.get("/", boards_service_1.default.getBoards);
boardsController.post("/", boards_service_1.default.createBoards);
boardsController.use("/:boardId/posts", posts_controller_1.default);
exports.default = boardsController;
//# sourceMappingURL=boards.controller.js.map