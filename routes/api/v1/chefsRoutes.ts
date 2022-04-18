import express from "express";
const router = express.Router();

import * as chefsController from "../../../controllers/chefsController";

router.get("/", chefsController.getChefs);
router.get("/chef-of-the-week", chefsController.getChefOfTheWeek);
router.get("/restaurants/:chefId", chefsController.getChefsRestaurants);
router.get("/:id", chefsController.getChefById);
router.post("/", chefsController.createChef);
router.delete("/:id", chefsController.deleteChef);
router.patch("/:id", chefsController.updateChef);

export default router;
