import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateClientController } from "../../../client/controllers/createClient/CreateClientController";
import { CreateEstablishmentController } from "../../../establishment/controllers/createEstablishment/CreateEstablishmentController";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, tel, is_establishment } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      tel,
      is_establishment,
    });

    if (!is_establishment) {
      const createClientController = new CreateClientController();

      await createClientController.handle(request, response, user.id);
    } else {
      const createEstablishmentController = new CreateEstablishmentController();

      await createEstablishmentController.handle(request, response, user.id);
    }

    return response.status(201).send();
  }
}

export { CreateUserController };
