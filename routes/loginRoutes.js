// Import necessary modules
import express from "express"; // Import the Express.js framework
import * as loginControllers from "../controllers/loginControllers.js"; // Import login controller functions
import * as resps from "../utils/response.js"; // Import custom response utility functions

// Create an instance of an Express Router
export const router = express.Router();

// Define a route for handling POST requests to "/login"
router.post("/", async (req, res) => {
  const { username, password } = req.body; // Destructure username and password from the request body

  try {
    // Call the loginUser function from the loginControllers module to attempt login
    const token = await loginControllers.loginUser(username, password);

    // If login is successful, send a success response with the token
    resps.successResp(res, "Login successful", { token });
  } catch (error) {
    console.error("Login error:", error.message);
    // If login fails, send an error response
    resps.errorResp(res, "Login failed");
  }
});

// Handle Not Found
router.use((req, res) => {
  resps.notFoundResp(res, "Route not found");
});
