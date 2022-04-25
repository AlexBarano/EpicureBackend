import express from "express";
const router = express.Router();

import * as loginController from "../../../controllers/loginController";
import * as authController from "../../../controllers/authController";

router.post("/", authController.authenticateToken, loginController.login);

export default router;
