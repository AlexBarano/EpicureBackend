import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // change this after to controller func
  res.send("get all dishes route");
});

export { router as dishesRouter };
