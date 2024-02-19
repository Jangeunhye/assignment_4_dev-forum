"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_middleware_1 = __importDefault(require("../../../../middlewares/authenticator.middleware"));
const likes_service_1 = __importDefault(require("./likes.service"));
const likesController = (0, express_1.Router)({ mergeParams: true });
likesController.get("/", authenticator_middleware_1.default, likes_service_1.default.getLikes);
likesController.post("/", authenticator_middleware_1.default, likes_service_1.default.createLike);
likesController.get("/:likeId", authenticator_middleware_1.default, likes_service_1.default.getLike);
likesController.delete("/:likeId", authenticator_middleware_1.default, likes_service_1.default.deleteLike);
exports.default = likesController;
//# sourceMappingURL=likes.controller.js.map