const db = require("../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

const Users = db.model("user", usersSchema);

module.exports = Users;
