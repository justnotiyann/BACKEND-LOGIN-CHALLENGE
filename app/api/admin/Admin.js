const db = require("../../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  email: String,
  password: String,
});

const Admin = db.model("admin", adminSchema);
module.exports = Admin;
