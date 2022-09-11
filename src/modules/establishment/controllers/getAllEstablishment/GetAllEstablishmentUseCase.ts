import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUserResponseDTO } from "../../../users/dtos/IUserResponseDTO";
import { UserMap } from "../../../users/mapper/UserMap";
import { IEstablishmentRepository } from "../../repositories/IEstablishmentRepository";

interface IRequest {
  except_user_id?: string;
}

@injectable()
class GetAllEstablishmentUseCase {
  constructor(
    @inject("EstablishmentRepository")
    private establishmentRepository: IEstablishmentRepository
  ) {}

  public async execute({
    except_user_id,
  }: IRequest): Promise<IUserResponseDTO[] | undefined> {
    const establishments =
      await this.establishmentRepository.findAllEstablishment({
        except_user_id,
      });

    if (!establishments) {
      throw new AppError("Establishments not found!", 400, "list.notFound");
    }

    return establishments.map((e) => UserMap.toDTO(e));
  }
}

export { GetAllEstablishmentUseCase };
