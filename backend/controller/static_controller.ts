import { NextFunction, Request, Response } from "express";
import FileNotFound from "../error/FileNotFound";
import sharp from "sharp";

import path from "path";
const publicFolder = path.join(__dirname, "..", "..", "public");

export const images = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;
  const { height = 300, width = 300 } = req.query;

  if (Number.isInteger(+height) === false && Number.isInteger(+width) === false) return next(new FileNotFound());

  try {
    const buffer = await sharp(`${publicFolder}/images/${name}`).resize(+height, +width, { fit: "cover" }).toBuffer();
    res.header("Content-Type", "image/jpeg");
    res.send(buffer);
  } catch (error) {
    return next(new FileNotFound());
  }
};
