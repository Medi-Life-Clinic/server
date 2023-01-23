import express from "express";
const app = express();
import userRoute from "./routes/user_routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", true);

app.use(express.json());

app.use("/api/user", userRoute);

app.get("/", (request, response) =>
  response.send({ info: "Medi-Life Clinic API" })
);

try {
  const m = await mongoose.connect(process.env.MONGODB_URL);
  console.log(
    m.connection.readyState === 1
      ? "Database connection established"
      : "Database connection failed"
  );
} catch (error) {
  console.log(error);
}

export default app;
