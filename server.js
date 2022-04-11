import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(process.env.port || 3000);
console.log("Web Server is listening at port " + (process.env.port || 3000));
