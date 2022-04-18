import express from "express";
const router = express.Router();

import * as restaurantsController from "../../../controllers/restaurantsController.js";

router.get("/", restaurantsController.getRestaurants);
router.get("/:restaurantId", restaurantsController.getRestaurantById);
router.post("/", restaurantsController.createRestaurant);
router.delete("/:restaurantId", restaurantsController.deleteRestaurant);
router.patch("/:restaurantId", restaurantsController.updateRestaurant);

export default router;
