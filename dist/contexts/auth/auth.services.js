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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_prisma_1 = __importDefault(require("../../prisma/client.prisma"));
class AuthService {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email.trim())
                    throw new Error("No email");
                if (!password.trim())
                    throw new Error("No password");
                const encryptedPassword = yield bcrypt_1.default.hash(password, 12);
                const user = yield client_prisma_1.default.user.create({
                    data: {
                        email,
                        encryptedPassword,
                    },
                    select: { id: true, email: true, createdAt: true },
                });
                res.json(user);
            }
            catch (e) {
                next(e);
            }
        });
    }
    logIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            //email받고 여기서 해당하는 id 존재하는지 확인
            const user = yield client_prisma_1.default.user.findUnique({
                where: { email: email },
            });
            if (!user)
                return res.sendStatus(404);
            const isVerified = yield bcrypt_1.default.compare(password, user.encryptedPassword);
            if (!isVerified)
                return res.sendStatus(400);
            const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
            const accessToken = jsonwebtoken_1.default.sign({ id: user.id.toString() }, JWT_SECRET_KEY, {
                subject: user.id.toString(),
            });
            res.json(accessToken);
        });
    }
}
const authService = new AuthService();
exports.default = authService;
//# sourceMappingURL=auth.services.js.map