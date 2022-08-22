import { Client } from "../modules/client/entities/Client";
import { Establishment } from "../modules/establishment/entities/Establishment";
import { User } from "../modules/users/entities/User";

export interface IFormatDataUser extends Omit<User, "password"> {
  cpf?: string;
  cnpj?: string;
  birth_date?: Date;
}

export function formatDataUser(
  user: User,
  data: Client | Establishment
): IFormatDataUser {
  if (data instanceof Establishment) {
    const {
      cnpj,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user: { password, ...rest },
    } = data;

    return { cnpj, ...rest };
  }

  if (data instanceof Client) {
    const {
      cpf,
      birth_date,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      user: { password, ...rest },
    } = data;

    return { cpf, birth_date, ...rest };
  }

  return user;
}
