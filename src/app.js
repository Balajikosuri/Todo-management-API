require("dotenv").config();
const connectToDatabase = require("./db/connectToDatabase");
const mongoose = require("mongoose");
const express = require("express");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 3001;

app.use(express.json());

connectToDatabase();

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
