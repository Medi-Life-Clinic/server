import { dbClose } from "./db.js";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

await userModel.deleteMany();
await doctorModel.deleteMany();
await appointmentModel.deleteMany();
console.log("All users deleted");
console.log("All doctors deleted");
console.log("All appointments deleted");

const users = [
  {
    name: "Administrator",
    email: "admin@medi-life.com",
    password: "$2a$10$pb73VNeuf0rFJ7cCuNg29uwG2VL5unRK1nwP2zi2KR5KPU6GAODx6", // PLAIN PW : "123456"
    isAdmin: true
  },
  {
    name: "Sonya Seduco",
    email: "sonya@microsoft.com",
    password: "$2a$10$K1MOsFe4CRjgkwWFT1ndmehI8NBaSGmOHe.Lp/64GQOXDU9Gxuw5i", // PLAIN PW: "password"
    isAdmin: false
  },
  {
    name: "Adam Thompson",
    email: "adam@hotmail.com",
    password: "$2a$10$mVdtzZCXksR4DMX3fGyQ2uGzJT1JiUUHmpe34.xihJipsko6JayNK", // PLAIN PW: "123456"
    isAdmin: false
  },
  {
    _id: "63dd68d12f3ad22b372477a6",
    name: "Michael D",
    email: "mike@hotmail.com",
    password: "$2a$10$frmBqc83tvqAtyBW5ZvlC.GzXRGKCJmaueGKMYAoFbrHLpsBZl2sO", // PLAIN PW : "123456"
    isAdmin: false
  },
];

await userModel.insertMany(users);
console.log("All users added");

const doctors = [
  {
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    bio: "Dr. John Doe is a cardiologist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. He received his medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. He is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Cardiology.",
    image:
      "https://img.freepik.com/free-photo/portrait-successful-young-doctor-with-folder-stethoscope_1262-12410.jpg?w=1380&t=st=1674710399~exp=1674710999~hmac=5239d5bf2b1f7c28c24388dc71782d33a6211a7745bdc570b822a18d013b0af0",
  },

  {
    name: "Dr. Sarah Jacobs",
    specialization: "Dentist",
    bio: "Dr. Sarah Jacobs is a dentist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. She received her medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. She is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Dentistry.",
    image:
      "https://img.freepik.com/free-photo/black-woman-with-stethoscope_1157-15563.jpg?w=1380&t=st=1674710448~exp=1674711048~hmac=0b5ec6c0daff92659ab817240d8989d35e2aa8b7a7d85d2b10e318b2862df39f",
  },

  {
    name: "Dr. Michael Smith",
    specialization: "Dermatologist",
    bio: "Dr. Michael Smith is a dermatologist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. He received his medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. He is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Dermatology.",
    image:
      "https://img.freepik.com/free-photo/portrait-successful-mid-adult-doctor-with-crossed-arms_1262-12865.jpg?w=1380&t=st=1674710422~exp=1674711022~hmac=ef74ba8e151b53c09f9647c55463dcd942ca1aca20cca39e3904c0203ab4d4c2",
  },
];

await doctorModel.insertMany(doctors);
console.log("All doctors added");

const appointments = [
  {
    "userId": "63dd68d12f3ad22b372477a6",
    "doctorId": "63dcdaf7d67cce5e32735ae1",
    "doctorInfo": {
      "_id": "63dcdaf7d67cce5e32735ae1",
      "name": "Dr. John Doe",
      "specialization": "Cardiologist",
      "bio": "Dr. John Doe is a cardiologist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. He received his medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. He is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Cardiology.",
      "image": "https://img.freepik.com/free-photo/portrait-successful-young-doctor-with-folder-stethoscope_1262-12410.jpg?w=1380&t=st=1674710399~exp=1674710999~hmac=5239d5bf2b1f7c28c24388dc71782d33a6211a7745bdc570b822a18d013b0af0",
      "__v": 0
    },
    "userInfo": {
      "name": "Michael D",
      "email": "mike@hotmail.com"
    },
    "date": "22-02-2023",
    "time": "13:00",
    "__v": 0
  },
  {
    "userId": "63dd68d12f3ad22b372477a6",
    "doctorId": "63dcdaf7d67cce5e32735ae2",
    "doctorInfo": {
      "_id": "63dcdaf7d67cce5e32735ae2",
      "name": "Dr. Sarah Jacobs",
      "specialization": "Dentist",
      "bio": "Dr. Sarah Jacobs is a dentist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. She received her medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. She is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Dentistry.",
      "image": "https://img.freepik.com/free-photo/black-woman-with-stethoscope_1157-15563.jpg?w=1380&t=st=1674710448~exp=1674711048~hmac=0b5ec6c0daff92659ab817240d8989d35e2aa8b7a7d85d2b10e318b2862df39f",
      "__v": 0
    },
    "userInfo": {
      "name": "Michael D",
      "email": "mike@hotmail.com"
    },
    "date": "16-02-2023",
    "time": "15:00",
    "__v": 0
  },
  {
    "userId": "63dd68d12f3ad22b372477a6",
    "doctorId": "63dcdaf7d67cce5e32735ae1",
    "doctorInfo": {
      "_id": "63dcdaf7d67cce5e32735ae1",
      "name": "Dr. John Doe",
      "specialization": "Cardiologist",
      "bio": "Dr. John Doe is a cardiologist in Toronto, Ontario and is affiliated with multiple hospitals in the area, including Humber River Hospital and St. Michael's Hospital. He received his medical degree from University of Toronto Faculty of Medicine and has been in practice for more than 20 years. He is one of 12 doctors at Humber River Hospital and one of 12 at St. Michael's Hospital who specialize in Cardiology.",
      "image": "https://img.freepik.com/free-photo/portrait-successful-young-doctor-with-folder-stethoscope_1262-12410.jpg?w=1380&t=st=1674710399~exp=1674710999~hmac=5239d5bf2b1f7c28c24388dc71782d33a6211a7745bdc570b822a18d013b0af0",
      "__v": 0
    },
    "userInfo": {
      "name": "Michael D",
      "email": "mike@hotmail.com"
    },
    "date": "23-02-2023",
    "time": "14:00",
    "__v": 0
  }
];
  await appointmentModel.insertMany(appointments);
  console.log("All appointments added");


dbClose();
