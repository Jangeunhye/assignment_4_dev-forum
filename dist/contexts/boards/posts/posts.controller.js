"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_middleware_1 = __importDefault(require("../../../middlewares/authenticator.middleware"));
const comments_controller_1 = __importDefault(require("./comments/comments.controller"));
const likes_controller_1 = __importDefault(require("./likes/likes.controller"));
const posts_service_1 = __importDefault(require("./posts.service"));
const postsController = (0, express_1.Router)({ mergeParams: true });
//posts
postsController.get("/", authenticator_middleware_1.default, posts_service_1.default.getPosts);
postsController.post("/", authenticator_middleware_1.default, posts_service_1.default.createPost);
postsController.get("/:postId", authenticator_middleware_1.default, posts_service_1.default.getPost);
postsController.put("/:postId", authenticator_middleware_1.default, posts_service_1.default.updatePost);
postsController.delete("/:postId", authenticator_middleware_1.default, posts_service_1.default.deletePost);
//comments
postsController.use("/:postId/comments", comments_controller_1.default);
//likes
postsController.use("/:postId/likes", likes_controller_1.default);
exports.default = postsController;
//# sourceMappingURL=posts.controller.js.map