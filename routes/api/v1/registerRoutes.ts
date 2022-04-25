import express from "express";
const router = express.Router();

import * as registerController from "../../../controllers/registerController";

router.post("/", registerController.register);

export default router;
