import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connect from "./db/connect.js";
import apiRouter from "./routes/api/index.js";

app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

const startServer = async () => {
  await connect(process.env.MONGODB_URL);
  app.listen(port);

  console.log("Web Server is listening at port " + port);
};

startServer();
