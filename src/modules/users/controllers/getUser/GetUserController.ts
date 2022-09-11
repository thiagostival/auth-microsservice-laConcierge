import { Request, Response } from "express";
import { container } from "tsyringe";

import { getDataTypeUser } from "../../../../middlewares/getDataTypeUser";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const getUserUseCase = container.resolve(GetUserUseCase);

    const user = await getUserUseCase.execute(id);

    const getUser = await getDataTypeUser(user);

    return response.json(getUser);
  }
}

export { GetUserController };
