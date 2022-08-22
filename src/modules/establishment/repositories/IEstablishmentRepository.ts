import { ICreateEstablishmentDTO } from "../dtos/ICreateEstablishmentDTO";
import { IFindAllEstablishmentDTO } from "../dtos/IFindAllEstablishmentDTO";
import { Establishment } from "../entities/Establishment";

interface IEstablishmentRepository {
  findAllEstablishment(
    id: IFindAllEstablishmentDTO
  ): Promise<Establishment[] | undefined>;
  findById(id: string): Promise<Establishment | undefined>;
  create(data: ICreateEstablishmentDTO): Promise<Establishment>;
  save(establishment: ICreateEstablishmentDTO): Promise<Establishment>;
}

export { IEstablishmentRepository };
