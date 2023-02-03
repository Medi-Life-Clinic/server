import express from "express";
import Doctor from "../models/doctorModel.js";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// route for all doctors
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


// delete doctor by id
router.post("/delete-by-id", authenticate, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.body.id);
    res.status(200).send({
      message: "Doctor deleted successfully",
      success: true,
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting doctor", success: false, error });
  }
});

export default router;
