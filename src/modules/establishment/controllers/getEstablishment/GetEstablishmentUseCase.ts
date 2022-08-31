import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import {
  formatDataUser,
  IFormatDataUser,
} from "../../../../middlewares/formatDataUser";
import { IGetEstablishmentDTO } from "../../dtos/IGetEstablishmentDTO";
import { IEstablishmentRepository } from "../../repositories/IEstablishmentRepository";

@injectable()
class GetEstablishmentUseCase {
  constructor(
    @inject("EstablishmentRepository")
    private establishmentRepository: IEstablishmentRepository
  ) {}

  async execute({ id }: IGetEstablishmentDTO): Promise<IFormatDataUser> {
    const establishment = await this.establishmentRepository.findById(id);

    if (!establishment) {
      throw new AppError(`Establishment not found.`, 400, "user.notFound");
    }

    return formatDataUser(establishment);
  }
}

export { GetEstablishmentUseCase };
