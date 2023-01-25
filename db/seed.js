import { dbClose } from "./db.js";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
// import bcrypt from "bcryptjs";

await userModel.deleteMany();
await doctorModel.deleteMany();
console.log("All users deleted");
console.log("All doctors deleted");

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

const doctors = [
  {
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    bio: "Dr. John Doe is a cardiologist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. He received his medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. He is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Cardiology.",
    clinicHours: {
      monday: "9:00am - 5:00pm",
      tuesday: "9:00am - 5:00pm",
      wednesday: "9:00am - 5:00pm",
      thursday: "9:00am - 5:00pm",
      friday: "9:00am - 5:00pm",
    },
  },

  {
    name: "Dr. Sarah Jacobs",
    specialization: "Dentist",
    bio: "Dr. Sarah Jacobs is a dentist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. She received her medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. She is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Dentistry.",
    clinicHours: {
      monday: "9:00am - 5:00pm",
      tuesday: "9:00am - 5:00pm",
      thursday: "9:00am - 5:00pm",
    },
  },

  {
    name: "Dr. Michael Smith",
    specialization: "Dermatologist",
    bio: "Dr. Michael Smith is a dermatologist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. He received his medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. He is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Dermatology.",
    clinicHours: {
      tuesday: "9:00am - 3:00pm",
      thursday: "9:00am - 3:00pm",
    },
  },
];

await doctorModel.insertMany(doctors);
console.log("All doctors added");

dbClose();

// const password = req.body.password;
// const salt = await bcrypt.genSalt(10);
// const hashedPassword = await bcrypt.hash(password, salt);

// req.body.password = hashedPassword;
