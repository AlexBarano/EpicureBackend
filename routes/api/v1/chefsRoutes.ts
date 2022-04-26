import express from "express";
const router = express.Router();

import * as authController from "../../../controllers/authController";
import * as chefsController from "../../../controllers/chefsController";

router.get("/", chefsController.getChefs);
router.get("/chef-of-the-week", chefsController.getChefOfTheWeek);
router.get("/restaurants/:chefId", chefsController.getChefsRestaurants);
router.get("/:id", chefsController.getChefById);
router.post("/", authController.authenticateToken, chefsController.createChef);
router.delete(
  "/:id",
  authController.authenticateToken,
  chefsController.deleteChef
);
router.patch(
  "/:id",
  authController.authenticateToken,
  chefsController.updateChef
);

export default router;
