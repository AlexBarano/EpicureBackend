import express from "express";
const router = express.Router();

import * as restaurantsController from "../../../controllers/restaurantsController.js";

router.get("/", restaurantsController.getRestaurants);
router.get("/popular-restaurants", restaurantsController.getPopularRestaurants);
router.post("/", restaurantsController.createRestaurant);
router.delete("/:id", restaurantsController.deleteRestaurant);
router.patch(
  "/popular-restaurants/:id",
  restaurantsController.updatePopularRestaurant
);
router.patch("/:id", restaurantsController.updateRestaurant);

export default router;
