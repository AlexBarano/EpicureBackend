import express from "express";
const router = express.Router();

import chefsRouter from "./chefsRoutes";
import restaurantsRouter from "./restaurantsRoutes";
import dishesRouter from "./dishesRoutes";
import loginRouter from "./loginRoute";
import registerRouter from "./registerRoutes";

router.use("/chefs", chefsRouter);
router.use("/dishes", dishesRouter);
router.use("/restaurants", restaurantsRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);

export default router;
