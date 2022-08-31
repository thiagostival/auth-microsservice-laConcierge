import { celebrate, Segments, Joi } from "celebrate";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/controllers/createUser/CreateUserController";
import { GetUserController } from "../modules/users/controllers/getUser/GetUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();

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
      cnpj: Joi.string().when("isEstablishment", {
        is: true,
        then: Joi.string().required().min(14).max(14),
      }),
      cpf: Joi.string().when("isEstablishment", {
        is: false,
        then: Joi.string().required().min(11).max(11),
      }),
      birth_date: Joi.string().when("isEstablishment", {
        is: false,
        then: Joi.string().required(),
      }),
    },
  }),
  createUserController.handle
);
usersRoutes.get("/", ensureAuthenticated, getUserController.handle);

export { usersRoutes };
