import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ id, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", 400, "user.notFound");
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarFile, "avatar");

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
