import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prismaClient from "../../prisma/client.prisma";
class AuthService {
  async signUp(
    req: Request<
      never,
      unknown,
      {
        id: string;
        password: string;
      }
    >,
    res: Response<Omit<User, "encryptedPassword">>,
    next: NextFunction
  ) {
    try {
      const { id, password } = req.body;
      if (!id.trim()) throw new Error("No id");
      if (!password.trim()) throw new Error("No password");

      const encryptedPassword = await bcrypt.hash(password, 12);
      const user = await prismaClient.user.create({
        data: {
          id,
          encryptedPassword,
        },
        select: { id: true, createdAt: true },
      });
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  async logIn(req: Request, res: Response) {
    const { id, password } = req.body;

    const user = await prismaClient.user.findUnique({
      where: { id: id },
    });
    if (!user) return res.sendStatus(404);
    const isVerified = await bcrypt.compare(password, user.encryptedPassword);
    if (!isVerified) return res.sendStatus(400);
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
    const accessToken = jwt.sign({ id: user.id.toString() }, JWT_SECRET_KEY, {
      subject: user.id.toString(),
    });
    res.json(accessToken);
  }
}

const authService = new AuthService();
export default authService;
