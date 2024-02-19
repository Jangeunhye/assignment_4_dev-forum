import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prismaClient from "../prisma/client.prisma";

const freePassRoutes = ["/auth/sign-up", "/auth/log-in"];

export default async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (freePassRoutes.includes(req.url)) return next();

  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  if (!accessToken) return res.sendStatus(401);

  try {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";
    const { sub: id } = jwt.verify(accessToken, JWT_SECRET_KEY);
    const stringId = id?.toString();
    const user = await prismaClient.user.findUnique({
      where: { id: stringId },
    });
    if (!user) return res.sendStatus(404);
    req.user = user;
  } catch (e) {
    return res.sendStatus(401);
  }
  next();
}
