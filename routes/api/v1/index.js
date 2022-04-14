import express from "express";
const router = express.Router();

import chefsRouter from "./chefsRoutes.js";
import restaurantsRouter from "./restaurantsRoutes.js";
import dishesRouter from "./dishesRoutes.js";

router.use("/chefs", chefsRouter);
router.use("/dishes", dishesRouter);
router.use("/restaurants", restaurantsRouter);

export default router;
