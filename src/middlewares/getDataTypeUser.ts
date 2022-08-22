import { container } from "tsyringe";

import { GetClientUseCase } from "../modules/client/controllers/getClient/GetClientUseCase";
import { GetEstablishmentUseCase } from "../modules/establishment/controllers/getEstablishment/GetEstablishmentUseCase";
import { User } from "../modules/users/entities/User";
import { IFormatDataUser } from "./formatDataUser";

export async function getDataTypeUser(user: User): Promise<IFormatDataUser> {
  if (user.isEstablishment) {
    const getEstablishmentUseCase = container.resolve(GetEstablishmentUseCase);

    const data = await getEstablishmentUseCase.execute({
      id: user.id,
    });

    return data;
  }

  if (!user.isAdmin) {
    const getClientUseCase = container.resolve(GetClientUseCase);

    const data = await getClientUseCase.execute({
      id: user.id,
    });

    return data;
  }

  return user;
}
