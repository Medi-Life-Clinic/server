import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {

    // nest doctor and user data in appointment
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doctors",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    date: { type: Date, required: true },
    time: { type: String, required: true }
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("appointments", appointmentSchema);

export default doctorModel;