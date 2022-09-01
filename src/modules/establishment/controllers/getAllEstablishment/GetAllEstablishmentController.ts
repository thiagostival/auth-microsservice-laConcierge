import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetUserUseCase } from "../../../users/controllers/getUser/GetUserUseCase";
import { GetAllEstablishmentUseCase } from "./GetAllEstablishmentUseCase";

class GetAllEstablishmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const email = request.user;

    const getUserUseCase = container.resolve(GetUserUseCase);

    const user = await getUserUseCase.execute({ email });

    const getAllEstablishmentUseCase = container.resolve(
      GetAllEstablishmentUseCase
    );

    const allEstablishments = await getAllEstablishmentUseCase.execute({
      except_user_id: user.is_establishment ? user.id : undefined,
    });

    return response.json(allEstablishments);
  }
}

export { GetAllEstablishmentController };
