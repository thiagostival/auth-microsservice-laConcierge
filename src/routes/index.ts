import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { establishmentRoutes } from "./establishment.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/establishment", establishmentRoutes);

export { router };
