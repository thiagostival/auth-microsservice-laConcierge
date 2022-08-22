import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IGetUserDTO } from "../../dtos/IGetUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email }: IGetUserDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User not found.`, 400, "user.notFound");
    }

    return user;
  }
}

export { GetUserUseCase };
