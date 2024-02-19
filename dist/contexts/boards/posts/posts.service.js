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
const client_prisma_1 = __importDefault(require("../../../prisma/client.prisma"));
class PostsService {
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boardId = Number(req.params.boardId);
                const posts = yield client_prisma_1.default.post.findMany({
                    where: { boardId: boardId },
                    orderBy: { createdAt: "desc" }, // 최신 게시물부터 정렬
                });
                res.json(posts);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const post = yield client_prisma_1.default.post.findUnique({
                    where: { id: postId },
                });
                res.json(post);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const boardId = Number(req.params.boardId);
                const { title, content } = req.body;
                const userId = req.user.id.toString();
                const post = yield client_prisma_1.default.post.create({
                    data: { title, content, userId, boardId },
                });
                res.json(post);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const boardId = Number(req.params.boardId);
                const { title, content } = req.body;
                const updatedPost = yield client_prisma_1.default.post.update({
                    where: {
                        id: postId,
                        boardId: boardId,
                    },
                    data: {
                        title,
                        content,
                    },
                });
                res.json(updatedPost);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
    deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const post = yield client_prisma_1.default.post.delete({
                    where: { id: postId },
                });
                res.json(post);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
const postsService = new PostsService();
exports.default = postsService;
//# sourceMappingURL=posts.service.js.map