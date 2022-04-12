import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // change this after to controller func
  res.send("get all restaurants route");
});

export { router as restaurantsRouter };
