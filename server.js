import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connect from "./db/connect.js";
import { chefsRouter } from "./routes/api/v1/chefsRoutes.js";
import { restaurantsRouter } from "./routes/api/v1/restaurantsRoutes.js";
import { dishesRouter } from "./routes/api/v1/dishesRoutes.js";

app.use("/chefs", chefsRouter);
app.use("/dishes", dishesRouter);
app.use("/restaurants", restaurantsRouter);

const port = process.env.PORT || 3000;

const startServer = async () => {
  // await connect(process.env.MONGODB_URL);
  app.listen(port);

  console.log("Web Server is listening at port " + port);
};

startServer();
