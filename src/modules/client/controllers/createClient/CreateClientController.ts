import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {
  async handle(
    request: Request,
    response: Response,
    user_id: string
  ): Promise<void> {
    const { cpf, birth_date } = request.body;

    const createClient = container.resolve(CreateClientUseCase);

    await createClient.execute({
      cpf,
      birth_date,
      id: user_id,
    });
  }
}

export { CreateClientController };
