import express from "express";
const router = express.Router();

import * as authMiddleware from "../../../middlewares/authMiddleware";
import * as dishesController from "../../../controllers/dishesController";

router.get("/", dishesController.getDishes);
router.get(
  "/signature-dishes",
  dishesController.getRestaurantsWithSignatureDishes
);
router.get("/restaurant/:id", dishesController.getDishesOfRestaurant);
router.get("/:id", dishesController.getDishById);
router.post("/", authMiddleware.authenticateToken, dishesController.createDish);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  dishesController.deleteDish
);
router.patch(
  "/:id",
  authMiddleware.authenticateToken,
  dishesController.updateDish
);

export default router;
