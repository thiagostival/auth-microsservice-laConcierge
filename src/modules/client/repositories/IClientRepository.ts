import { ICreateclientDTO } from "../dtos/ICreateclientDTO";
import { Client } from "../entities/Client";

interface IClientRepository {
  findById(id: string): Promise<Client | undefined>;
  create(data: ICreateclientDTO): Promise<Client>;
}

export { IClientRepository };
