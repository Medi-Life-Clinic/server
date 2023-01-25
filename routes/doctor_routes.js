import express from "express";
import Doctor from "../models/doctorModel.js";

const router = express.Router();

// create route for all doctors

router.get("/all", async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send(doctors);
  } catch (error) {
    res.status(500).send({ message: "Error getting doctors", error });
  }
});

export default router;
