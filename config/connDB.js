// Import necessary modules
import mysql from "mysql2/promise"; // Import the mysql2/promise library for MySQL database connections
import dotenv from "dotenv"; // Import dotenv to manage environment variables
dotenv.config(); // Load environment variables from a .env file

// Create a connection pool to the database using the environment variables
const connDB = mysql.createPool({
  host: process.env.DB_HOST, // Database host (e.g., localhost)
  user: process.env.DB_USER, // Database user
  password: process.env.DB_PASSWORD, // Database user's password
  database: process.env.DB, // Database name
});

// Export the connection pool for use in other modules
export default connDB;
