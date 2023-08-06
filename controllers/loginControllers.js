// Import necessary modules
import bcrypt from "bcrypt"; // Import the bcrypt library for password hashing and comparison
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for working with JWTs
import connDB from "../config/connDB.js"; // Import the database connection pool
import dotenv from "dotenv"; // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from a .env file

// Controller function for user login
export const loginUser = async (username, password) => {
  // SQL query to select a user with the provided username
  const sql = "SELECT * FROM users WHERE username = ?";
  const [users] = await connDB.query(sql, [username]); // Execute the query using the connection pool

  // Check if a user with the provided username exists
  if (users.length === 0) {
    throw new Error("User not found");
  }

  // Get the first user (assuming usernames are unique)
  const user = users[0];

  // Compare the provided password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If the password is invalid, throw an error
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  // Generate a JWT access token containing user data and sign it with the JWT_SECRET
  const accessToken = jwt.sign(
    { userId: user.user_id }, // Payload data to include in the token
    process.env.JWT_SECRET, // Secret key for signing the token
    {
      expiresIn: "1h", // Token expiration time
    }
  );

  // Return the generated access token
  return accessToken;
};
