import express from "express";
const app = express();
import userRoute from "./routes/user_routes.js";
import doctorRoute from "./routes/doctor_routes.js";
import appointmentRoute from "./routes/appointment_routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Configuration
dotenv.config();
mongoose.set("strictQuery", true);

app.use(cors());
app.use(express.json());

// URI for user routes
app.use("/api/user", userRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/appointment", appointmentRoute)

// Default route
app.get("/", (request, response) =>
  response.send({ info: "Medi-Life Clinic API" })
);

// Connect to database using Mongoose
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

const port = process.env.PORT || 4001;

app.listen(port, () =>
  console.log(`App running on port @ http://localhost:${port}`)
);

export default app;
