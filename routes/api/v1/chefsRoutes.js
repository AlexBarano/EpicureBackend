import express from "express";
const router = express.Router();

import * as chefsController from "../../../controllers/chefsController.js";

router.get("/", chefsController.getChefs);

export { router as chefsRouter };
