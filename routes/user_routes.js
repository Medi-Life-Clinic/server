import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/auth.js";

const router = express.Router();

// End point for User Registration
router.post("/register", async (req, res) => {
  try {
    // Check if user already exists by email from req.body
    const userExists = await User.findOne({ email: req.body.email });
    // If user exists, send error message that account already exists
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    // If user does not exist, hash the password using bcrypt
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Makes the value of the password from req.body the hashed password
    req.body.password = hashedPassword;
    // Create a new user using the User model and the req.body
    const newuser = new User(req.body);
    // Save the new user to the database
    await newuser.save();
    // Send a response to the client that user was created successfully
    res
      .status(200)
      .send({ message: "User created Successfully", success: true });
  } catch (error) {
    // Catch any errors and send a response to the client
    res
      .status(500)
      .send({ message: "Error creating User", success: false, error });
  }
});

// End point for User Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // If user does not exist, send error message
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    // Check password against database hashed password using bcrypt.compare (incoming password, database password)
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // If password does not match, send error message
    if (!validPassword) {
      return res
        .status(200)
        .send({ message: "Invalid password", success: false });
    }
    // If password matches, generate a JWT token and send it to the client
    else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        // expiresIn: "1d", // Token expires in 1 hour ****CHANGE TO 1 HOUR BEFORE DEPLOYMENT****
      });
      // Send successful response to client with token
      res.status(200).send({
        message: "Login successful",
        success: true,
        token: token,
        user: user.name,
      });
    }
  } catch (error) {
    console.log(error); // Log error to console for debugging
    res // Send error response to client
      .status(500)
      .send({ message: "Error logging in user", success: false, error });
  }
});

router.post("/get-all", authenticate, async (req, res) => {
  try {
    //show all users
    const users = await User.find({});
    res.status(200).send({ message: "All users list from db", success: true, data: users });
    // const user = await User.findOne({ _id: req.body.userId });
    // if (!user) {
    //   res.status(200).send({ message: "User not found", success: false });
    // } else {
    //   res.status(200).send({
    // success: true,
    // data: {
    //   name: user.user,
    //   email: user.email,
    // },
    //   });
    // }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting user", success: false, error });
  }
});

export default router;
