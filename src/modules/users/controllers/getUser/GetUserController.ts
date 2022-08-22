import { Request, Response } from "express";
import { container } from "tsyringe";

import { getDataTypeUser } from "../../../../middlewares/getDataTypeUser";
import { GetUserUseCase } from "./GetUserUseCase";

class GetUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const email = request.user;

    const getUserUseCase = container.resolve(GetUserUseCase);

    const user = await getUserUseCase.execute({ email });

    const getUser = await getDataTypeUser(user);

    return response.json(getUser);
  }
}

export { GetUserController };
