"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticator_middleware_1 = __importDefault(require("../middlewares/authenticator.middleware"));
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
const boards_controller_1 = __importDefault(require("./boards/boards.controller"));
const home_controller_1 = __importDefault(require("./home/home.controller"));
const users_controller_1 = __importDefault(require("./user/users.controller"));
const controllers = (0, express_1.Router)();
controllers.use("/", home_controller_1.default);
controllers.use("/auth", auth_controller_1.default);
controllers.use("/boards", boards_controller_1.default);
controllers.use("/users", authenticator_middleware_1.default, users_controller_1.default);
exports.default = controllers;
//# sourceMappingURL=index.js.map