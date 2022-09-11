import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatarFile = request.file?.filename;

    if (!avatarFile) {
      throw new AppError("Avatar File not found", 400, "user.avatar");
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ id, avatarFile });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
