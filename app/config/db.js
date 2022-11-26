const mongoose = require("mongoose");
require("dotenv").config();
const mongoDB = process.env.DATABASE;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("berhasil terhubung ke database"));

module.exports = db;
