import { NextFunction, Request, Response } from "express";
export default function authenticator(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=authenticator.middleware.d.ts.map