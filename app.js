import express, { application } from "express";
const app = express();
const userRoute = require("./routes/user_routes");

app.use(express.json());

app.use("/api/user", userRoute);

app.get("/", (request, response) =>
  response.send({ info: "Medi-Life Clinic API" })
);

export default app;
