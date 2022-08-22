import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateEstablishmentUseCase } from "./CreateEstablishmentUseCase";

class CreateEstablishmentController {
  async handle(
    request: Request,
    response: Response,
    user_id: string
  ): Promise<void> {
    const { cnpj } = request.body;

    const createEstablishment = container.resolve(CreateEstablishmentUseCase);

    await createEstablishment.execute({
      cnpj,
      id: user_id,
    });
  }
}

export { CreateEstablishmentController };
