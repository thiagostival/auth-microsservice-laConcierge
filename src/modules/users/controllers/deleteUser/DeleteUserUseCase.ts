import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const userExists = await this.usersRepository.findById(id);

    if (!userExists) {
      throw new AppError(`User with id: ${id} is not exists`);
    }

    await this.usersRepository.delete(id);
  }
}

export { DeleteUserUseCase };
