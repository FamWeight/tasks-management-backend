// Import the database connection pool
import connDB from "../config/connDB.js";

// Controller function to create a new user
export const createData = (
  username,
  email,
  hashedPassword,
  name,
  dateOfBirth,
  bio
) => {
  const createdAt = new Date();
  const updatedAt = createdAt;
  const sql =
    "INSERT INTO users (username, email, password, name, date_of_birth, bio, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    username,
    email,
    hashedPassword,
    name,
    dateOfBirth,
    bio,
    createdAt,
    updatedAt,
  ];
  return connDB.query(sql, values);
};

// Controller function to retrieve all users
export const getData = () => {
  const sql = "SELECT * FROM users";
  return connDB.query(sql);
};

// Controller function to retrieve user details by ID
export const getDataById = (userId) => {
  const sql = "SELECT * FROM users WHERE user_id = ?";
  return connDB.query(sql, [userId]);
};

// Controller function to update user data
export const updateData = async (
  username,
  email,
  hashedPassword,
  name,
  dateOfBirth,
  bio,
  userId
) => {
  const createdAt = new Date();
  const updatedAt = createdAt;

  const sql = "UPDATE users SET ? WHERE user_id = ?";
  const newData = {
    username,
    email,
    password: hashedPassword, // Update the hashed password
    name,
    date_of_birth: dateOfBirth, // Correct field name
    bio,
    created_at: createdAt,
    updated_at: updatedAt,
  };

  // Use the database connection pool to execute the update query
  const [result] = await connDB.query(sql, [newData, userId]);
  return result;
};

// Controller function to delete a user by ID
export const deleteData = (userId) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  return connDB.query(sql, [userId]);
};

// Controller function to search for users by username or email
export const searchDatas = (searchQuery) => {
  const sql = "SELECT * FROM users WHERE username LIKE ? OR email LIKE ?";
  const likeQuery = `%${searchQuery}%`;
  return connDB.query(sql, [likeQuery, likeQuery]);
};

// Controller function to retrieve the total user count
export const getDataCount = () => {
  const sql = "SELECT COUNT(*) AS userCount FROM users";
  return connDB.query(sql);
};
