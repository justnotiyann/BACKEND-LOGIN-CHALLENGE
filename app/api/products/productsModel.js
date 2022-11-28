const db = require("../../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    book_title: String,
    author: String,
    price: String,
    publisher: String,
  },
  { timestamps: true }
);

const Products = db.model("product", productSchema);
module.exports = Products;
