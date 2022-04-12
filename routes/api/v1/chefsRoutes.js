import express from "express";
const router = express.Router();

import * as chefsController from "../../../controllers/chefsController.js";

router.get("/", chefsController.getChefs);
router.put("/", chefsController.createChef);
router.delete("/:id", chefsController.deleteChef);
router.patch("/:id", chefsController.updateChef);
export default router;
