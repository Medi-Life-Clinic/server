import express from "express";
import authenticate from "../middleware/auth.js";
import Appointment from "../models/appointModel.js";

const router = express.Router();

router.get("/get-all", authenticate, async (req, res) => {
  try {
    const doctors = await Appointment.find({});
    res.status(200).send({
        message: "All appointments list from database",
        success: true,
        data: doctors,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting appointments", success: false, error });
  }
});

export default router;
