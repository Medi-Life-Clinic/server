import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  doctorInfo: {
    type: Object,
    required: false, // temp
  },
  userInfo: {
    type: Object,
    required: false, // temp
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  // bookingStatus: {
  //   type: String,
  //   required: true,
  //   default: "pending",
  // },
});

const appointmentModel = mongoose.model("appointments", appointmentSchema);

export default appointmentModel;
