import express from "express";

const app = express();

app.use(express.json());

app.get("/", (request, response) =>
  response.send({ info: "Medi-Life Clinic API" })
);

export default app;
