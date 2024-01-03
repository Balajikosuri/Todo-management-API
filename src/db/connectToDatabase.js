require("dotenv").config();

const mongoose = require("mongoose");

// const mongodbUsername = process.env.MongoDb_Username;
// const mongodbPassword = process.env.MongoDb_Password;
const mongodbUri = process.env.MONGODB_URI;

async function connectToDatabase() {
  try {
    const mongodbUri = process.env.MONGODB_URI;
    mongoose.connect(mongodbUri);
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
