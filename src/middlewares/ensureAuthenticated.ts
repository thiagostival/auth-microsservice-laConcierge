import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { auth } from "../config/auth";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/users/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not present.", 401, "token.invalid");
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new AppError("Token not present.", 401, "token.invalid");
  }

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists!", 401, "user.notExist");
    }

    request.user = {
      id: user_id,
      is_establishment: user.is_establishment,
    };

    next();
  } catch {
    throw new AppError("Token invalid.", 401, "token.expired");
  }
}
