import express from "express";
import authenticate from "../middleware/auth.js";
import Appointment from "../models/appointmentModel.js";
import moment from "moment";

const router = express.Router();

// check availability

router.post("/check-availability", authenticate, async (req, res) => {
  try {
    const date = req.body.date;
    const doctorId = req.body.doctorId;
    console.log(doctorId);

    const appointments = await Appointment.find({
      doctorId,
      date,
    });
    if (appointments.length > 0) {
      res.status(200).send({
        message: "Doctor is not available on this date",
        success: false,
        length : appointments.length
      });
    } else {
      res.status(200).send({
        message: "Doctor is available on this date",
        success: true,
        length : appointments.length,
        date : date
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error booking appointments", success: false, error });
  }
});

///////////////////////

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

router.post("/book-appointment", authenticate, async (req, res) => {
  try {
    // req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    // const doctor = await Doctor.findOne({ _id: req.body.doctorId });
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

export default router;
