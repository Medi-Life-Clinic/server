import express from "express";
import Doctor from "../models/doctorModel.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// end point for getDoctorData (for booking)

router.post("/get-doctor-info-by-id", authenticate, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body._id });
    res.status(200).send({
      success: true,
      message: "Doctor fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor", success: false, error });
  }
});

//below routes for testing

///
///

// route for all doctors (not for booking)
router.get("/get-all", authenticate, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "All Doctors list from database",
      success: true,
      data: doctors,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctors", success: false, error });
  }
});

// route for doctor info by doctorId (not for booking)
router.post("/get-doctor-info-by-user-id", authenticate, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body._id }); // changed to _id from doctorId to match the request body
    res.status(200).send({
      success: true,
      message: "Doctor info fetched successfully",
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting doctor", success: false, error });
  }
});

export default router;
