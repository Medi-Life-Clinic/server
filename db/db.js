import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

// Close connection to database
async function dbClose() {
  await mongoose.connection.close();
  console.log("Database connection closed");
}

// Connect to database using Mongoose

try {
  const m = await mongoose.connect(process.env.MONGODB_URL);
  console.log(
    m.connection.readyState === 1
      ? "Database connection established"
      : "Database connection failed"
  );
} catch (error) {
  console.log(error);
}

// Create Mongoose Schema for user data
const userSchema = new mongoose.Schema({
  name: 'String',
  email: 'String', // add unique: true at some point
  password: 'String'
});

// Create Mongoose Model for user data
const User = mongoose.model('User', userSchema);

// Export database connection and user model
export { dbClose, User };