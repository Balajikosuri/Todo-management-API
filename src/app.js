const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 3001;

app.use(express.json());

// const mongodbUsername = process.env.MongoDb_Username;
// const mongodbPassword = process.env.MongoDb_Password;
const mongodbUsername = "balajikosuri";
const mongodbPassword = "balajiqwerty123";

function connectToDatabase() {
  try {
    mongoose.connect(
      `mongodb+srv://${mongodbUsername}:${mongodbPassword}@todo1.mxkldpe.mongodb.net/todosAppDb`
    );

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to the database");
    });
  } catch (error) {
    console.log(error);
  }
}

connectToDatabase();

app.use("/users", userRoutes);
app.use("/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
