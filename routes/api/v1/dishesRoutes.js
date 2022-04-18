import express from "express";
const router = express.Router();

import * as dishesController from "../../../controllers/dishesController.js";

router.get("/", dishesController.getDishes);
router.get(
  "/signature-dishes",
  dishesController.getRestaurantsWithSignatureDishes
);
router.get("/:id", dishesController.getDishById);
router.post("/", dishesController.createDish);
router.delete("/:id", dishesController.deleteDish);
router.patch("/:id", dishesController.updateDish);

export default router;
