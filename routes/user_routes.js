import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticate from "../middleware/auth.js";
import adminAuth from "../middleware/admin.js";
import { check, validationResult } from "express-validator";

// const express = require('express');
const router = express.Router();

// const router = express.Router();
// Validation rules.
const registerValidate = [
  // Check email
  check("email", "Email Must Be an Email Address")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  // Check password
  check("password", "Password Must Be at Least 8 Characters")
    .isLength({ min: 8 })
    .trim()
    .escape(),
  // Check user name
  check("name", "Name Must Be at Least 3 Characters")
    .isLength({ min: 3 })
    .trim()
    .escape(),
];
// End point for User Registration
router.post("/register", registerValidate, async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .send({ errors: errors.array()[0].msg, success: false });
  } else {
    try {
      // Check if user already exists by email from req.body
      const userExists = await User.findOne({ email: req.body.email });
      // If user exists, send error message that account already exists
      if (userExists) {
        return res
          .status(409)
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
  }
});

// End point for User Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // If user does not exist, send error message
    if (!user) {
      return res
        .status(208)
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
        .status(403)
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
        userId: user._id,
        isAdmin: user.isAdmin,
      });
    }
  } catch (error) {
    console.log(error); // Log error to console for debugging
    res // Send error response to client
      .status(500)
      .send({ message: "Error logging in user", success: false, error });
  }
});

//end point for getting all users
router.get("/get-all", authenticate, async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .send({ message: "All users list from db", success: true, data: users });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting user", success: false, error });
  }
});

//end point to delete user by id
router.delete("/delete-by-id", authenticate, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.id);
    res.status(200).send({
      message: "User deleted successfully",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error deleting user", success: false, error });
  }
});

// module.exports = router;
export default router;
