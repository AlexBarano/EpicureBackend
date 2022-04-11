import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connect from "./db/connect.js";

// app.use("/chefs");
// app.use("/dishes");
// app.use("/restaurants");

const port = process.env.PORT || 3000;

const startServer = async () => {
  await connect(process.env.MONGODB_URL);
  app.listen(process.env.port || 3000);

  console.log("Web Server is listening at port " + port);
};

startServer();
