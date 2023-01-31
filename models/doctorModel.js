import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  bio: { type: String, required: true },
  image: { type: String, required: true },
});

const doctorModel = mongoose.model("doctors", doctorSchema);

export default doctorModel;
