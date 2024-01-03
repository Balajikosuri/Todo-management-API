require("dotenv").config();

const mongoose = require("mongoose");

const mongodbUsername = process.env.MongoDb_Username;
const mongodbPassword = process.env.MongoDb_Password;

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

module.exports = connectToDatabase;
