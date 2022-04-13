import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import connect from "./db/connect.js";
import v1Router from "./routes/api/index.js";

app.use(express.json());

app.use("/v1", v1Router);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("connected to the data base");
  } catch (error) {
    console.log("Didnt established connection to data base");
    console.log(error);
  }

  app.listen(port);

  console.log("Web Server is listening at port " + port);
};

startServer();
