import { Client } from "../modules/client/entities/Client";
import { Establishment } from "../modules/establishment/entities/Establishment";
import { User } from "../modules/users/entities/User";

export interface IFormatDataUser extends Omit<User, "password"> {
  cpf?: string;
  cnpj?: string;
  birth_date?: Date;
}

export function formatDataUser(data: Client | Establishment): IFormatDataUser {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    user: { password, ...restUser },
    ...restData
  } = data;

  return { ...restUser, ...restData };
}
