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
const client_prisma_1 = __importDefault(require("../../../../prisma/client.prisma"));
class CommentsService {
    getComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const comments = yield client_prisma_1.default.comment.findMany({
                    where: { postId: postId },
                });
                res.json(comments);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    getComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = Number(req.params.commentId);
                const comment = yield client_prisma_1.default.comment.findUnique({
                    where: { id: commentId },
                });
                res.json(comment);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const { content } = req.body;
                const userId = req.user.id.toString();
                const comment = yield client_prisma_1.default.comment.create({
                    data: { content, userId, postId },
                });
                res.json(comment);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = Number(req.params.commentId);
                const { content } = req.body;
                const updateComment = yield client_prisma_1.default.comment.update({
                    where: {
                        id: commentId,
                    },
                    data: {
                        content,
                    },
                });
                res.json(updateComment);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = Number(req.params.commentId);
                const comment = yield client_prisma_1.default.comment.delete({
                    where: { id: commentId },
                });
                res.json(comment);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
const commentsService = new CommentsService();
exports.default = commentsService;
//# sourceMappingURL=comments.service.js.map