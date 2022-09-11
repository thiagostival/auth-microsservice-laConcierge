import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserResponseDTO } from "../../../users/dtos/IUserResponseDTO";
import { UserMap } from "../../../users/mapper/UserMap";
import { IEstablishmentRepository } from "../../repositories/IEstablishmentRepository";

interface IRequest {
  id: string;
}

@injectable()
class GetEstablishmentUseCase {
  constructor(
    @inject("EstablishmentRepository")
    private establishmentRepository: IEstablishmentRepository
  ) {}

  async execute({ id }: IRequest): Promise<IUserResponseDTO> {
    const establishment = await this.establishmentRepository.findById(id);

    if (!establishment) {
      throw new AppError(`Establishment not found.`, 400, "user.notFound");
    }

    return UserMap.toDTO(establishment);
  }
}

export { GetEstablishmentUseCase };
