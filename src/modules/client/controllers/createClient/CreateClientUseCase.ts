import { injectable, inject } from "tsyringe";

import { IClientRepository } from "../../repositories/IClientRepository";

interface IRequest {
  id: string;
  cpf: string;
  birth_date: Date;
}

@injectable()
class CreateClientUseCase {
  constructor(
    @inject("ClientRepository")
    private clientRepository: IClientRepository
  ) {}

  public async execute({ id, cpf, birth_date }: IRequest): Promise<void> {
    await this.clientRepository.create({
      id,
      cpf,
      birth_date,
    });
  }
}

export { CreateClientUseCase };
