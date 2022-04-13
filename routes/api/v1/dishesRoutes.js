import express from "express";
const router = express.Router();

import * as dishesController from "../../../controllers/dishesController.js";

router.get("/", dishesController.getDishes);
router.post("/", dishesController.createDish);
router.delete("/:id", dishesController.deleteDish);
router.patch("/:id", dishesController.updateDish);

export default router;
