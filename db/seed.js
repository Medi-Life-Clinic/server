import { dbClose } from "./db.js";
import userModel from "../models/userModel.js";
// import bcrypt from "bcryptjs";

await userModel.deleteMany();
console.log("All users deleted");

const users = [
  {
    name: "John Doe",
    email: "john@foo.com",
    password: "123456",
  },
  {
    name: "Sarah Jacobs",
    email: "sarah@bar.com",
    password: "abcdef",
  },
  {
    name: "Michael Smith",
    email: "mikey@hotmail.com",
    password: "123abc",
  },
  {
    name: "Michael D",
    email: "mike@hotmail.com",
    password: "$2a$10$frmBqc83tvqAtyBW5ZvlC.GzXRGKCJmaueGKMYAoFbrHLpsBZl2sO", // PLAIN PW : "123456"
  },
];

await userModel.insertMany(users);
console.log("All users added");

dbClose();

// const password = req.body.password;
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);

// req.body.password = hashedPassword;
