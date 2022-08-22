import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetAllEstablishmentController } from "../modules/establishment/controllers/getAllEstablishment/GetAllEstablishmentController";
import { GetEstablishmentController } from "../modules/establishment/controllers/getEstablishment/GetEstablishmentController";

const establishmentRoutes = Router();

const getAllEstablishmentController = new GetAllEstablishmentController();
const getEstablishmentController = new GetEstablishmentController();

establishmentRoutes.use(ensureAuthenticated);

establishmentRoutes.get("/all", getAllEstablishmentController.handle);

establishmentRoutes.get(
  "/:est_id",
  celebrate({
    [Segments.PARAMS]: {
      est_id: Joi.string().uuid().required(),
    },
  }),
  getEstablishmentController.handle
);

export { establishmentRoutes };
