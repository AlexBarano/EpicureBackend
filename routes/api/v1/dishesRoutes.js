import express from "express";
const router = express.Router();

import * as dishesController from "../../../controllers/dishesController.js";

router.get("/", dishesController.getDishes);

export { router as dishesRouter };
