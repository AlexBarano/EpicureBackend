import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import connect from "./db/connect";
import apiRouter from "./routes/api/index";

app.use(express.json());
app.use(cors());
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connect(process.env.MONGODB_URL as string);
    console.log("connected to the data base");
  } catch (error) {
    console.log("Didnt established connection to data base");
    console.log(error);
  }

  app.listen(port);

  console.log("Web Server is listening at port " + port);
};

startServer();
