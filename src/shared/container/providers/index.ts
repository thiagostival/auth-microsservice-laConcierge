import { container } from "tsyringe";

import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  LocalStorageProvider
);
