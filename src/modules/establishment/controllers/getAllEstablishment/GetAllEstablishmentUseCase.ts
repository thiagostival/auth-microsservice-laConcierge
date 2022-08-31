import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import {
  formatDataUser,
  IFormatDataUser,
} from "../../../../middlewares/formatDataUser";
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
  }: IRequest): Promise<IFormatDataUser[] | undefined> {
    const establishment =
      await this.establishmentRepository.findAllEstablishment({
        except_user_id,
      });

    if (!establishment) {
      throw new AppError("Establishments not found!", 400, "list.notFound");
    }

    const formatedEstablishment = establishment.map((e) => formatDataUser(e));

    return formatedEstablishment;
  }
}

export { GetAllEstablishmentUseCase };
