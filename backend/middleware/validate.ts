import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import ZodValidationError from "../error/ZodValidationError";

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    return next();
  } catch (error) {
    if (!(error instanceof ZodError)) return;
    const data: { [key: string]: string } = {};
    for (const issue of error.errors) {
      data[issue.path[1]] = issue.message;
    }
    return next(new ZodValidationError(data));
  }
};

export default validate;
