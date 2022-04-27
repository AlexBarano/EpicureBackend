import express from "express";
const router = express.Router();

import * as authMiddleware from "../../../middlewares/authMiddleware";
import * as chefsController from "../../../controllers/chefsController";

router.get("/", chefsController.getChefs);
router.get("/chef-of-the-week", chefsController.getChefOfTheWeek);
router.get("/restaurants/:chefId", chefsController.getChefsRestaurants);
router.get("/:id", chefsController.getChefById);
router.post("/", authMiddleware.authenticateToken, chefsController.createChef);
router.delete(
  "/:id",
  authMiddleware.authenticateToken,
  chefsController.deleteChef
);
router.patch(
  "/:id",
  authMiddleware.authenticateToken,
  chefsController.updateChef
);

export default router;
