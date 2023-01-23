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
  const m = await mongoose.connect(process.env.MONGO_DB_URL);
  console.log(
    m.connection.resyState === 1
      ? "Database connection established"
      : "Database connection failed"
  );
} catch (error) {
  console.log(error);
}

// Create Mongoose Schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create Mongoose Model for user data
const UserModel = mongoose.model("User", userSchema);

// Export database connection and user model
export { dbClose, UserModel };
