import { NextFunction, Request, Response } from "express";

const wait = (second: number) => async (req: Request, res: Response, next: NextFunction) => {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("OK");
    }, second * 1000);
  });

  return next();
};

export default wait;
