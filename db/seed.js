import { UserModel, dbClose } from "./db";

await UserModel.deleteMany();
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

await UserModel.insertMany(users);
console.log("All users added");

dbClose();
