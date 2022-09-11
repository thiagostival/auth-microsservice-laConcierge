import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(name: string): Promise<User | undefined>;
}

export { IUsersRepository };
