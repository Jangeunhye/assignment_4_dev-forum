"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_middleware_1 = __importDefault(require("../../../../middlewares/authenticator.middleware"));
const comments_service_1 = __importDefault(require("./comments.service"));
const commentsController = (0, express_1.Router)({ mergeParams: true });
commentsController.get("/", authenticator_middleware_1.default, comments_service_1.default.getComments);
commentsController.post("/", authenticator_middleware_1.default, comments_service_1.default.createComment);
commentsController.get("/:commentId", authenticator_middleware_1.default, comments_service_1.default.getComment);
commentsController.put("/:commentId", authenticator_middleware_1.default, comments_service_1.default.updateComment);
commentsController.delete("/:commentId", authenticator_middleware_1.default, comments_service_1.default.deleteComment);
exports.default = commentsController;
//# sourceMappingURL=comments.controller.js.map