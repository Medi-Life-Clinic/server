import { User, dbClose } from "./db.js";

await User.deleteMany();
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
];

await User.insertMany(users);
console.log("All users added");

dbClose();
