import express, { Express } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./router/auth_router";
import staticRouter from "./router/static_router";
import cors from "cors";
import cookieParser from "cookie-parser";
import defaultErrorHandler from "./middleware/defaultErrorHandler";

dotenv.config();

const app: Express = express();

const port = process.env.PORT ?? 8000;

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);
app.use(cookieParser());

app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/auth", authRouter);
app.use("/static", staticRouter);

app.use(defaultErrorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
