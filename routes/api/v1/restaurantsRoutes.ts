import express from "express";
const router = express.Router();

import * as authMiddleware from "../../../middlewares/authMiddleware";
import * as restaurantsController from "../../../controllers/restaurantsController";

router.get("/", restaurantsController.getRestaurants);
router.get("/popular-restaurants", restaurantsController.getPopularRestaurants);
router.get("/:restaurantId", restaurantsController.getRestaurantById);
router.post(
  "/",
  authMiddleware.authenticateToken,
  restaurantsController.createRestaurant
);
router.delete(
  "/:restaurantId",
  authMiddleware.authenticateToken,
  restaurantsController.deleteRestaurant
);
router.patch(
  "/:restaurantId",
  authMiddleware.authenticateToken,
  restaurantsController.updateRestaurant
);

export default router;
