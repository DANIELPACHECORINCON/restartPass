import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db/db.js";
import userRoute from "./routes/user.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);


app.listen(process.env.PORT, () =>
  console.log("Listening in port: " + process.env.PORT)
);

db.dbConnection();