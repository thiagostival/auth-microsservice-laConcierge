import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/controllers/createUser/CreateUserController";
import { DeleteUserController } from "../modules/users/controllers/deleteUser/DeleteUserController";
import { GetUserController } from "../modules/users/controllers/getUser/GetUserController";
import { UpdateUserAvatarController } from "../modules/users/controllers/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const deleteUserController = new DeleteUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      tel: Joi.string(),
      is_establishment: Joi.boolean().default(false),
      is_admin: Joi.boolean().default(false),
      cnpj: Joi.string().when("is_establishment", {
        is: true,
        then: Joi.string().required().min(14).max(14),
      }),
      cpf: Joi.string().when("is_establishment", {
        is: false,
        then: Joi.string().required().min(11).max(11),
      }),
      birth_date: Joi.string().when("is_establishment", {
        is: false,
        then: Joi.string().required(),
      }),
    },
  }),
  createUserController.handle
);

usersRoutes.get("/", ensureAuthenticated, getUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.delete("/delete", ensureAuthenticated, deleteUserController.handle);

export { usersRoutes };
