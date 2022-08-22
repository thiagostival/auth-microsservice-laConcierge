import { isCelebrateError } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import "./database";
import "./shared/container";

import { AppError } from "./errors/AppError";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    if (isCelebrateError(err)) {
      const message =
        err.details.get("body")?.message || err.details.get("params")?.message;

      return response.status(400).json({
        message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

app.listen(3333);
