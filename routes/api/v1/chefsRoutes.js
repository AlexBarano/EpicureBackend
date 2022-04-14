import express from "express";
const router = express.Router();

import * as chefsController from "../../../controllers/chefsController.js";

router.get("/", chefsController.getChefs);
router.get("/chef-of-the-week", chefsController.getChefOfTheWeek);
router.get("/:id", chefsController.getChefById);
router.post("/", chefsController.createChef);
router.delete("/:id", chefsController.deleteChef);
router.patch("/chef-of-the-week/:id", chefsController.updateChefOfTheWeek);
router.patch("/:id", chefsController.updateChef);

export default router;
