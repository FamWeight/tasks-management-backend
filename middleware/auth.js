// Import necessary modules
import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for working with JWTs
import { errorResp } from "../utils/response.js"; // Import the errorResp function for handling error responses
import dotenv from "dotenv"; // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from a .env file

// Middleware function for authenticating JWT tokens
export const authenticateToken = (req, res, next) => {
  // Extract the "Authorization" header from the request
  const authHeader = req.headers["authorization"];

  // Check if the header contains a valid JWT token
  const token = authHeader && authHeader.split(" ")[1];

  // If there is no token, return an "Unauthorized" error response
  if (token == null) {
    return errorResp(res, "Unauthorized", 401);
  }

  // Verify the token using the JWT_SECRET from the environment variables
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If there's an error while verifying the token, return a "Forbidden" error response
    if (err) {
      return errorResp(res, "Forbidden", 403);
    }

    // If the token is valid, attach the user data to the request and call the next middleware
    req.user = user;
    next();
  });
};

// Export the authenticateToken middleware for use in other modules
export default authenticateToken;
