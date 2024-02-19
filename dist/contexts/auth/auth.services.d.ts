import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
declare class AuthService {
    signUp(req: Request<never, unknown, {
        email: string;
        password: string;
    }>, res: Response<Omit<User, "encryptedPassword">>, next: NextFunction): Promise<void>;
    logIn(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
declare const authService: AuthService;
export default authService;
//# sourceMappingURL=auth.services.d.ts.map