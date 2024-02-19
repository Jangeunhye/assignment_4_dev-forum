"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const contexts_1 = __importDefault(require("./contexts"));
const jsonParser = body_parser_1.default.json();
const app = (0, express_1.default)();
const port = 5050;
app.use(jsonParser);
app.use(contexts_1.default);
app.listen(port, () => {
    console.log(`안녕 서버시작 내 포트는 ${port}`);
});
//# sourceMappingURL=app.js.map