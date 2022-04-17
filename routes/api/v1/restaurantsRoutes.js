import express from "express";
const router = express.Router();

import * as restaurantsController from "../../../controllers/restaurantsController.js";

// change to have very small number of end points
router.get("/", restaurantsController.getRestaurants);
router.get("/:restaurantId", restaurantsController.getRestaurantById);
// router.get("/popular-restaurants", restaurantsController.getPopularRestaurants);
// router.get("/signature-dishes", restaurantsController.getSignatureDishes);
// router.get("/signature-dishes/:dishId", restaurantsController.getSignatureDish);
// router.get("/:chefId", restaurantsController.getRestaurantsOfChefId);
router.post("/", restaurantsController.createRestaurant);
router.delete("/:restaurantId", restaurantsController.deleteRestaurant);
// router.patch(
//   "/popular-restaurants/:restaurantId",
//   restaurantsController.updatePopularRestaurant
// );
router.patch("/:restaurantId", restaurantsController.updateRestaurant);

export default router;
