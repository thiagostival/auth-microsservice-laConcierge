import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetEstablishmentUseCase } from "./GetEstablishmentUseCase";

class GetEstablishmentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { est_id } = request.params;

    const getEstablishmentUseCase = container.resolve(GetEstablishmentUseCase);

    const establishment = await getEstablishmentUseCase.execute({
      id: est_id,
    });

    return response.json(establishment);
  }
}

export { GetEstablishmentController };
