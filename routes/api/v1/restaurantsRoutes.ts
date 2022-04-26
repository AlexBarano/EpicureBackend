import express from "express";
const router = express.Router();

import * as authController from "../../../controllers/authController";
import * as restaurantsController from "../../../controllers/restaurantsController";

router.get("/", restaurantsController.getRestaurants);
router.get("/popular-restaurants", restaurantsController.getPopularRestaurants);
router.get("/:restaurantId", restaurantsController.getRestaurantById);
router.post(
  "/",
  authController.authenticateToken,
  restaurantsController.createRestaurant
);
router.delete(
  "/:restaurantId",
  authController.authenticateToken,
  restaurantsController.deleteRestaurant
);
router.patch(
  "/:restaurantId",
  authController.authenticateToken,
  restaurantsController.updateRestaurant
);

export default router;
