const dotenv = require("dotenv")
const cors = require('cors');
const connectToDatabase = require("./db/connectToDatabase");
const mongoose = require("mongoose");
const express = require("express");
app.use(cors());
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
// for access .env variables 
dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

connectToDatabase();

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
