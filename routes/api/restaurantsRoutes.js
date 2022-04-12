import express from "express";
const router = express.Router();

import * as restaurantsController from "../../controllers/restaurantsController.js";

router.get("/", restaurantsController.getRestaurants);
router.put("/", restaurantsController.createRestaurant);
router.delete("/:id", restaurantsController.deleteRestaurant);
router.patch("/:id", restaurantsController.updateRestaurant);

export default router;
