import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserResponseDTO } from "../../../users/dtos/IUserResponseDTO";
import { UserMap } from "../../../users/mapper/UserMap";
import { IClientRepository } from "../../repositories/IClientRepository";

interface IRequest {
  id: string;
}

@injectable()
class GetClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}

  async execute({ id }: IRequest): Promise<IUserResponseDTO> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new AppError(`Client not found.`, 400, "user.notFound");
    }

    return UserMap.toDTO(client);
  }
}

export { GetClientUseCase };
