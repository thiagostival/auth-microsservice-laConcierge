import { Client } from "../../client/entities/Client";
import { Establishment } from "../../establishment/entities/Establishment";
import { User } from "../entities/User";

type IUserResponseDTO = Omit<User, "getAvatarUrl"> &
  (Omit<Client, "user"> | Omit<Establishment, "user">);

export { IUserResponseDTO };
