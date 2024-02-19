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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_prisma_1 = __importDefault(require("../prisma/client.prisma"));
const freePassRoutes = ["/auth/sign-up", "/auth/log-in"];
function authenticator(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (freePassRoutes.includes(req.url))
            return next();
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split("Bearer ")[1];
        if (!accessToken)
            return res.sendStatus(401);
        try {
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
            const { sub: id } = jsonwebtoken_1.default.verify(accessToken, JWT_SECRET_KEY);
            const stringId = id === null || id === void 0 ? void 0 : id.toString();
            const user = yield client_prisma_1.default.user.findUnique({
                where: { id: stringId },
            });
            if (!user)
                return res.sendStatus(404);
            req.user = user;
        }
        catch (e) {
            return res.sendStatus(401);
        }
        next();
    });
}
exports.default = authenticator;
//# sourceMappingURL=authenticator.middleware.js.map