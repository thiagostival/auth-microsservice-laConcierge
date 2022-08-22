import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetClientUseCase } from "./GetClientUseCase";

class GetClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const getClientUseCase = container.resolve(GetClientUseCase);

    const client = await getClientUseCase.execute({
      id: user_id,
    });

    return response.json(client);
  }
}

export { GetClientController };
