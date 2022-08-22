import { injectable, inject } from "tsyringe";

import { Establishment } from "../../entities/Establishment";
import { IEstablishmentRepository } from "../../repositories/IEstablishmentRepository";

interface IRequest {
  id: string;
  cnpj: string;
}

@injectable()
class CreateEstablishmentUseCase {
  constructor(
    @inject("EstablishmentRepository")
    private establishmentRepository: IEstablishmentRepository
  ) {}

  public async execute({ id, cnpj }: IRequest): Promise<Establishment> {
    const establishment = await this.establishmentRepository.create({
      id,
      cnpj,
    });

    return establishment;
  }
}

export { CreateEstablishmentUseCase };
