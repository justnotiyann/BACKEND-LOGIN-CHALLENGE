const Products = require("../../models/Products");

const getAllProducts = async () => {
  const result = await Products.find().select("_id name price country");
  return result;
};

const createProduct = async (req) => {
  const { name, price, country } = req.body;
  const result = new Products({
    name,
    price,
    country,
  }).save();
  return result;
};

module.exports = { getAllProducts, createProduct };
