import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "../db/client";
import bcrypt from "bcryptjs";
import CredentialError from "../error/CredentialError";
import signToken from "../utils/signToken";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import jwt_payload_frontend from "../types/jwt_payload_frontend";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import PrismaConstrainError from "../error/PrismaConstrainError";
import jwt_payload_value from "../types/jwt_payload_value";

export const login = async function (req: Request, res: Response, next: NextFunction) {
  let user = null;
  let roles = null;
  const { email } = req.body;
  console.log(email);

  try {
    user = await prisma.user.findUnique({ where: { email: email }, include: { RolesUser: { select: { roles: { select: { name: true } } } } } });

    if (user === null) {
      throw new CredentialError();
    }
    roles = user.RolesUser.map(({ roles }) => roles.name);

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      throw new CredentialError();
    }
  } catch (error) {
    return next(error);
  }

  let token: string = signToken({ id: user.id, name: user.name, roles });

  res.cookie("session_id", token, {
    sameSite: "lax",
    secure: false,
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day,
  });
  const data: jwt_payload_frontend = { userId: user!.id, userName: user!.name, token, roles: [] };

  res.send({ ...data, roles: [...roles] });
};

export const register = async function (req: Request, res: Response, next: NextFunction) {
  let user = null;
  let { name, password, email } = req.body;

  try {
    password = bcrypt.hashSync(password, 10);

    user = await prisma.user.create({ data: { name, password, email } });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2002") {
      return next(new PrismaConstrainError({ message: "Email telah digunakan" }));
    }
    return next(error);
  }

  let token: string = signToken({ id: user.id, name: user.name, roles: [] });

  res.cookie("session_id", token, {
    sameSite: "lax",
    secure: false,
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day,
  });

  const data: jwt_payload_frontend = { userId: user!.id, userName: user!.name, token, roles: [] };

  res.send({ ...data, roles: [] });
};

export const verify = async function (req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.session_id;

  if (token === undefined) {
    return next(new CredentialError("Token Tidak Titemukan"));
  }
  let data: jwt_payload_value | null = null;

  try {
    data = jwt.verify(token, process.env.SECRET_KEY!) as jwt_payload_value;
    //
  } catch (error) {
    //
    if (error instanceof TokenExpiredError) {
      return next(new CredentialError("Token Kadaluarsa"));
    }
    //
  }
  if (data === null) return next(new Error());
  console.log(data);

  const responseData: jwt_payload_frontend = { roles: data.roles, token: token, userId: data.userId, userName: data.userName };

  res.send(responseData);
};

export const logOut = async function (req: Request, res: Response, next: NextFunction) {
  res.clearCookie("session_id");
  res.send({ isReady: true });
};
