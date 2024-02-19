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
class LikesService {
    getLikes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const likes = yield client_prisma_1.default.like.findMany({
                    where: { postId: postId },
                });
                res.json(likes);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    getLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likeId = Number(req.params.likeId);
                const like = yield client_prisma_1.default.like.findUnique({
                    where: { id: likeId },
                });
                res.json(like);
            }
            catch (e) {
                res.sendStatus(404);
            }
        });
    }
    createLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postId = Number(req.params.postId);
                const userId = req.user.id.toString();
                const like = yield client_prisma_1.default.like.create({
                    data: { userId, postId },
                });
                res.json(like);
            }
            catch (e) {
                res.send(400);
            }
        });
    }
    deleteLike(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const likeId = Number(req.params.likeId);
                const like = yield client_prisma_1.default.like.delete({
                    where: { id: likeId },
                });
                res.json(like);
            }
            catch (e) {
                res.sendStatus(400);
            }
        });
    }
}
const likesService = new LikesService();
exports.default = likesService;
//# sourceMappingURL=likes.service.js.map