import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AuthError from "../error/AuthError";

export default function auth(req: Request, res: Response, next: NextFunction) {
  const token: string = req.cookies.session_id;
  if (token === undefined) {
    throw new AuthError("Token in required");
  }
  try {
    const status = jwt.verify(token, process.env.SECRET_KEY!) as { userId: string };
    res.locals.userId = status.userId;
  } catch (error) {
    return next(new AuthError("Invalid Token"));
  }
  return next();
}
