const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Add a new user
app.post("/users", async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body);
    console.log("Add new user called");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error adding user" });
  }
});

// Edit user
app.put("/users/:id", async (req, res) => {
  try {
    const response = await axios.put(`${API_URL}/${req.params.id}`, req.body);
    console.log("Edit user called");
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/${req.params.id}`);
    console.log("Delete user called");
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
