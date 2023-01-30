import express from "express";
import authenticate from "../middleware/auth.js";
import Appointment from "../models/appointmentModel.js";

const router = express.Router();

// check availability

router.post("/check-availability", authenticate, async (req, res) => {
  try {
    const date = req.body.date;
    const doctorId = req.body.doctorId;
    const time = req.body.time;

    const appointments = await Appointment.find({
      doctorId,
      date,
      time,
    });
    console.log(appointments);
    if (appointments.length > 0) {
      res.status(200).send({
        message: "Doctor is not available on this date",
        success: false,
        date: date,
      });
    } else {
      res.status(200).send({
        message: "Doctor is available on this date",
        success: true,
        date: date,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error booking appointments", success: false, error });
  }
});

router.post("/book-appointment", authenticate, async (req, res) => {
  // needs auth middleware
  try {
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res
      .status(200)
      .send({ message: "Appointment booked successfully", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error booking appointment", success: false });
  }
});

///////////////////////

router.get("/get-all", authenticate,  async (req, res) => {
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

// get all appointments by user id
router.post("/get-all-by-user-id", authenticate, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.body.userId }); // need to send userId in body
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

export default router;
