"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
class BoardService {
    getBoards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const board = yield client_prisma_1.default.board.findMany();
                res.send(board);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    createBoards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            try {
                const board = yield client_prisma_1.default.board.create({
                    data: {
                        name,
                    },
                });
                res.json(board);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
const boardService = new BoardService();
exports.default = boardService;
//# sourceMappingURL=boards.service.js.map