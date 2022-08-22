import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import {
  formatDataUser,
  IFormatDataUser,
} from "../../../../middlewares/formatDataUser";
import { IGetClientDTO } from "../../dtos/IGetClientDTO";
import { IClientRepository } from "../../repositories/IClientRepository";

@injectable()
class GetClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute({ id }: IGetClientDTO): Promise<IFormatDataUser> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError(`Client not found.`, 400, "user.notFound");
    }

    return formatDataUser(client.user, client);
  }
}

export { GetClientUseCase };
