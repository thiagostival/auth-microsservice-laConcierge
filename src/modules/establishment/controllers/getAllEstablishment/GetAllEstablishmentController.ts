import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAllEstablishmentUseCase } from "./GetAllEstablishmentUseCase";

class GetAllEstablishmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, is_establishment } = request.user;

    const getAllEstablishmentUseCase = container.resolve(
      GetAllEstablishmentUseCase
    );

    const allEstablishments = await getAllEstablishmentUseCase.execute({
      except_user_id: is_establishment ? id : undefined,
    });

    return response.json(allEstablishments);
  }
}

export { GetAllEstablishmentController };
