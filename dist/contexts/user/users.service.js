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
class UsersService {
    getLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id.toString();
            //userId 별 like의 postId 가져오기
            try {
                const likes = yield client_prisma_1.default.like.findMany({
                    where: { userId },
                    select: { postId: true },
                });
                // likes 배열에서 postId만 추출
                const postIds = likes.map((like) => like.postId);
                // Post 테이블에서 해당 postId에 해당하는 모든 게시물 정보를 조회
                const posts = yield client_prisma_1.default.post.findMany({
                    where: {
                        id: { in: postIds }, // postId 리스트에 포함된 postId들로 조회
                    },
                });
                res.json(posts); // 조회된 게시물 정보 반환
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id.toString();
            try {
                const posts = yield client_prisma_1.default.post.findMany({
                    where: { userId },
                });
                res.json(posts);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
}
const usersService = new UsersService();
exports.default = usersService;
//# sourceMappingURL=users.service.js.map