import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  bio: { type: String, required: true },
  clinicHours: { type: Object, required: true },
  image: { type: String, required: true },
  // availability: { type: Array, required: true }
  // clinicDays : { type: Object, required: true }, // be nice to implement this later
});

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
