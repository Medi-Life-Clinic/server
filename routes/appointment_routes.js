import express from "express";
import authenticate from "../middleware/auth.js";
import Appointment from "../models/appointmentModel.js";

const router = express.Router();

router.get("/get-all", authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).send({
      message: "All appointments list from database",
      success: true,
      data: appointments,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting appointments", success: false, error });
  }
});

router.get("/book-appointment", authenticate, async (req, res) => {
  try {
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    // const doctor = await Doctor.findOne({ _id: req.body.doctorId });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error booking appointment", success: false, error });
  }
});

export default router;
