import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  // change this after to controller func
  res.send("get all chefs route");
});

export { router as chefsRouter };
