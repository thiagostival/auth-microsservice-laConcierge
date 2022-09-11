import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class GetUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError(`User not found.`, 400, "user.notFound");
    }

    return user;
  }
}

export { GetUserUseCase };
