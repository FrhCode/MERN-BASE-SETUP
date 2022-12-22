import { NextFunction, Request, Response } from "express";
import fs from "fs";
import ZodValidationError from "../error/ZodValidationError";
import PrismaConstrainError from "../error/PrismaConstrainError";

const defaultErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status === undefined) {
    fs.appendFileSync("error_log.txt", `${new Date()} ${error.message}\n\n`);
    return res.status(500).send({ message: "Somethink Went Wrong" });
  }
  if (error instanceof ZodValidationError || error instanceof PrismaConstrainError) {
    return res.status(error.status).send(error.message);
  }
  return res.status(error.status).send({ name: error.name, message: error.message });
};

export default defaultErrorHandler;
