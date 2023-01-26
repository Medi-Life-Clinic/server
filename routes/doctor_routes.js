import express from "express";
import Doctor from "../models/doctorModel.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// create route for all doctors

router.get("/get-all", authenticate,  async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res
      .status(200)
      .send({
        message: "All Doctors list from database",
        success: true,
        data: doctors,
      });
  } catch (error) {
    res.status(500).send({ message: "Error getting doctors", success: false, error });
  }
});


router.post("/get-doctor-info-by-user-id", authenticate, async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
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
