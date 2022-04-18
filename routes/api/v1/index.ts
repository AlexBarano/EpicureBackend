import express from "express";
const router = express.Router();

import chefsRouter from "./chefsRoutes";
import restaurantsRouter from "./restaurantsRoutes";
import dishesRouter from "./dishesRoutes";

router.use("/chefs", chefsRouter);
router.use("/dishes", dishesRouter);
router.use("/restaurants", restaurantsRouter);

export default router;
