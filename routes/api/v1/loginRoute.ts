import express from "express";
const router = express.Router();

import * as loginController from "../../../controllers/loginController";

router.post("/", loginController.login);

// authController.authenticateToken,
export default router;
