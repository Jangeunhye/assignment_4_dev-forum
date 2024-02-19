"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_service_1 = __importDefault(require("./users.service"));
const usersController = (0, express_1.Router)();
usersController.get("/posts", users_service_1.default.getPosts);
usersController.get("/likes", users_service_1.default.getLikes);
exports.default = usersController;
//# sourceMappingURL=users.controller.js.map