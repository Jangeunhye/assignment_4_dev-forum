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
class HomeService {
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 게시판 ID들을 조회
                const boards = yield client_prisma_1.default.board.findMany({
                    select: { id: true },
                });
                // 각 게시판별로 최신 게시물을 조회
                const postsPromises = boards.map((board) => client_prisma_1.default.post.findMany({
                    where: { boardId: board.id },
                    orderBy: { createdAt: "desc" }, // 최신 게시물부터 정렬
                    take: 10, // 각 게시판별로 최신 10개 게시물만 가져옴
                }));
                const postsByBoard = yield Promise.all(postsPromises);
                const response = boards.map((board, index) => ({
                    boardId: board.id,
                    posts: postsByBoard[index],
                }));
                res.json(response);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
const homeService = new HomeService();
exports.default = homeService;
//# sourceMappingURL=home.service.js.map