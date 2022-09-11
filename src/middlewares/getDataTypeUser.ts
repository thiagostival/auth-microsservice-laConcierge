import { container } from "tsyringe";

import { GetClientUseCase } from "../modules/client/controllers/getClient/GetClientUseCase";
import { GetEstablishmentUseCase } from "../modules/establishment/controllers/getEstablishment/GetEstablishmentUseCase";
import { IUserResponseDTO } from "../modules/users/dtos/IUserResponseDTO";
import { User } from "../modules/users/entities/User";

export async function getDataTypeUser(user: User): Promise<IUserResponseDTO> {
  const getUserUseCase = user.is_establishment
    ? container.resolve(GetEstablishmentUseCase)
    : container.resolve(GetClientUseCase);

  const data = await getUserUseCase.execute({
    id: user.id,
  });

  return data;
}
