import express from "express";
const router = express.Router();

import * as restaurantsController from "../../../controllers/restaurantsController.js";

router.get("/", restaurantsController.getRestaurants);

export { router as restaurantsRouter };
