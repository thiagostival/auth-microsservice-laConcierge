import { getRepository, Repository } from "typeorm";

import { ICreateclientDTO } from "../../dtos/ICreateclientDTO";
import { Client } from "../../entities/Client";
import { IClientRepository } from "../IClientRepository";

class ClientRepository implements IClientRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findById(id: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(id, {
      relations: ["user"],
      select: ["cpf", "birth_date", "user"],
    });

    return client;
  }

  public async create(clientData: ICreateclientDTO): Promise<Client> {
    const client = this.ormRepository.create(clientData);

    await this.ormRepository.save(client);

    return client;
  }
}

export default ClientRepository;
