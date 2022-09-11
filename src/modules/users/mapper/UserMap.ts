import { classToClass } from "class-transformer";

import { Client } from "../../client/entities/Client";
import { Establishment } from "../../establishment/entities/Establishment";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
  static toDTO(getUser: Client | Establishment): IUserResponseDTO {
    const { user, ...rest } = classToClass(getUser);

    return { ...user, ...rest };
  }
}

export { UserMap };
