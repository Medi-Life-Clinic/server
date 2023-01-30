import mongoose from "mongoose";

// Create Mongoose Schema for user data
const userSchema = new mongoose.Schema({
  name: { type: "String", require: true },
  email: { type: "String", require: true },
  password: { type: "String", require: true },
});

// Create Mongoose Model for user data
const userModel = mongoose.model("users", userSchema);

export default userModel;
