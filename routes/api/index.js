import express from "express";
const router = express.Router();

import apiRouter from "./v1/index.js";

router.use("/api", apiRouter);

export default router;
