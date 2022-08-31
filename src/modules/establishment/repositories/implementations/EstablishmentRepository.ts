import { getRepository, Not, Repository } from "typeorm";

import { ICreateEstablishmentDTO } from "../../dtos/ICreateEstablishmentDTO";
import { IFindAllEstablishmentDTO } from "../../dtos/IFindAllEstablishmentDTO";
import { Establishment } from "../../entities/Establishment";
import { IEstablishmentRepository } from "../IEstablishmentRepository";

class EstablishmentRepository implements IEstablishmentRepository {
  private ormRepository: Repository<Establishment>;

  constructor() {
    this.ormRepository = getRepository(Establishment);
  }

  public async findById(id: string): Promise<Establishment | undefined> {
    const establishment = await this.ormRepository.findOne(id, {
      relations: ["user"],
    });

    return establishment;
  }

  public async findAllEstablishment({
    except_user_id,
  }: IFindAllEstablishmentDTO): Promise<Establishment[] | undefined> {
    let establishment: Establishment[];

    if (except_user_id) {
      establishment = await this.ormRepository.find({
        relations: ["user"],
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      establishment = await this.ormRepository.find({
        relations: ["user"],
      });
    }

    return establishment;
  }

  public async create(
    establishmentData: ICreateEstablishmentDTO
  ): Promise<Establishment> {
    const establishment = this.ormRepository.create(establishmentData);

    await this.ormRepository.save(establishment);

    return establishment;
  }

  public async save(establishment: Establishment): Promise<Establishment> {
    return this.ormRepository.save(establishment);
  }
}

export default EstablishmentRepository;
