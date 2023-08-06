// Import necessary modules
import bcrypt from "bcrypt"; // Import the bcrypt library for password hashing
import * as resps from "./response.js"; // Import custom response utility functions

// Middleware function for hashing passwords
export const passwordHash = async (req, res, next) => {
  if (req.body.password) {
    // Check if a password is provided in the request body
    try {
      const saltRounds = 10; // Number of salt rounds for bcrypt hashing
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // Hash the provided password
      req.hashedPassword = hashedPassword; // Store the hashed password in the request object
    } catch (error) {
      console.error(`Error while hashing password ${error}`);
      resps.errorResp(res, "Failed to hash password"); // Respond with an error message if hashing fails
      return;
    }
  }
  next(); // Move to the next middleware
};
