// Import necessary modules
import express from "express"; // Import the Express.js framework
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import * as resps from "./utils/response.js"; // Import custom response utility functions
import { router as userRoutes } from "./routes/userRoutes.js"; // Import user routes
import { router as loginRoutes } from "./routes/loginRoutes.js"; // Import login routes
dotenv.config(); // Load environment variables from a .env file

// Create an instance of the Express application
const app = express();

// Parse incoming requests with JSON payloads
app.use(express.json());

// Use the imported routes for '/login' and '/users' paths
app.use("/login", loginRoutes); // Use login routes
app.use("/users", userRoutes); // Use user routes

// Handle requests for undefined routes
app.use((req, res) => {
  resps.notFoundResp(res, "Route not found"); // Respond with a "Route not found" error message
});

// Define the port to listen on
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`); // Print a message indicating that the server is running
});
