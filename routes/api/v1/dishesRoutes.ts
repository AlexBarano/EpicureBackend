import express from "express";
const router = express.Router();

import * as authController from "../../../controllers/authController";
import * as dishesController from "../../../controllers/dishesController";

router.get("/", dishesController.getDishes);
router.get(
  "/signature-dishes",
  dishesController.getRestaurantsWithSignatureDishes
);
router.get("/restaurant/:id", dishesController.getDishesOfRestaurant);
router.get("/:id", dishesController.getDishById);
router.post("/", authController.authenticateToken, dishesController.createDish);
router.delete(
  "/:id",
  authController.authenticateToken,
  dishesController.deleteDish
);
router.patch(
  "/:id",
  authController.authenticateToken,
  dishesController.updateDish
);

export default router;
