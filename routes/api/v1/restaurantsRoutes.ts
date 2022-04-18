import express from "express";
const router = express.Router();

import * as restaurantsController from "../../../controllers/restaurantsController";

router.get("/", restaurantsController.getRestaurants);
router.get("/popular-restaurants", restaurantsController.getPopularRestaurants);
router.get("/:restaurantId", restaurantsController.getRestaurantById);
router.post("/", restaurantsController.createRestaurant);
router.delete("/:restaurantId", restaurantsController.deleteRestaurant);
router.patch("/:restaurantId", restaurantsController.updateRestaurant);

export default router;
