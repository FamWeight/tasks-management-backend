// Import necessary modules and functions
import express from "express";
import * as userControllers from "../controllers/userControllers.js"; // Import user controller functions
import * as resps from "../utils/response.js"; // Import custom response utility functions
import bcrypt from "bcrypt"; // Import the bcrypt library for password hashing
export const router = express.Router(); // Create an instance of an Express Router
import { authenticateToken } from "../middleware/auth.js"; // Import the authentication middleware

// Create user
router.post("/", async (req, res) => {
  const { username, email, name, dateOfBirth, bio, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the createData function from userControllers to create a new user
    const data = await userControllers.createData(
      username,
      email,
      hashedPassword,
      name,
      dateOfBirth,
      bio
    );

    // Search for the created user
    const [user] = await userControllers.searchDatas(username);

    // Send a success response with the created user's details
    resps.createdResp(res, "User created successfully", user);
  } catch (error) {
    console.error("Error while creating user:", error.message);
    resps.errorResp(res, "Failed to create user");
  }
});

// Get all users
router.get("/", authenticateToken, async (req, res) => {
  try {
    // Call the getData function from userControllers to retrieve all users
    const [user] = await userControllers.getData();

    // Send a success response with all user details
    resps.successResp(res, "Showing all users.", user);
  } catch (error) {
    console.error("Error while showing users:", error);
    resps.errorResp(res, "Failed to show users");
  }
});

// Update user by ID
router.put("/:userId", authenticateToken, async (req, res) => {
  // Extract parameters from the request
  const userId = req.params.userId;
  const { username, email, name, dateOfBirth, bio, password } = req.body;

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Call the updateData function from userControllers to update user data
    const result = await userControllers.updateData(
      username,
      email,
      hashedPassword,
      name,
      dateOfBirth,
      bio,
      userId
    );

    // Check if the update was successful and send an appropriate response
    if (result.affectedRows > 0) {
      resps.successResp(res, "User updated successfully");
    } else {
      resps.notFoundResp(res, "User not found");
    }
  } catch (error) {
    console.error("Error while updating user:", error);
    resps.errorResp(res, "Failed to update user");
  }
});

// Delete user by ID
router.delete("/:userId", authenticateToken, async (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.userId;

  try {
    // Call the deleteData function from userControllers to delete the user
    const result = await userControllers.deleteData(userId);

    // Send a success response indicating the user was deleted
    resps.successResp(res, `User by ID: ${userId}. Has been deleted.`, result);
  } catch (error) {
    console.error("Error while deleting user:", error);
    resps.errorResp(res, "Failed to delete user");
  }
});

// Get user by ID
router.get("/:userId", authenticateToken, async (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.userId;

  try {
    // Call the getDataById function from userControllers to retrieve user details
    const [data] = await userControllers.getDataById(userId);

    // Check if user details were found and send an appropriate response
    if (data.length > 0) {
      resps.successResp(res, `Showing users by ID: ${userId}`, data);
    } else {
      resps.notFoundResp(res, `Users by ID: ${userId} not found.`);
    }
  } catch (error) {
    console.error("Error while showing user details:", error.message);
    resps.errorResp(res, "Failed to show user details");
  }
});

// Search users
router.get("/search/:query", authenticateToken, async (req, res) => {
  // Extract the search query from the request parameters
  const searchQuery = req.params.query;

  try {
    // Call the searchDatas function from userControllers to search for users
    const [data] = await userControllers.searchDatas(searchQuery);

    // Send a success response with the search results
    resps.successResp(res, "Showing search results.", data);
  } catch (error) {
    console.error("Error while searching users:", error);
    resps.errorResp(res, "Failed to search users");
  }
});

// Get user count
router.get("/count", authenticateToken, async (req, res) => {
  try {
    // Call the getDataCount function from userControllers to retrieve user count
    const [data] = await userControllers.getDataCount();

    // Send a success response with the user count
    resps.successResp(res, "Showing user count.", data);
  } catch (error) {
    console.error("Error while showing user count:", error);
    resps.errorResp(res, "Failed to show user count");
  }
});

// Handle Not Found for undefined routes
router.use((req, res) => {
  resps.notFoundResp(res, "Route not found");
});
