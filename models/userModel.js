import mongoose from "mongoose";

// Create Mongoose Schema for user data
const userSchema = new mongoose.Schema(
  {
    name: { type: "String", require: true },
    email: { type: "String", require: true }, // add unique: true at some point
    password: { type: "String", require: true },
  },
  {
    timestamps: true,
  }
);

// Create Mongoose Model for user data
const userModel = mongoose.model("User", userSchema);

export default userModel;
