const Products = require("../../api/products/productsModel");

const getAllProducts = async () => {
  const result = await Products.find();
  return result;
};

const createProduct = async (req) => {
  const { book_title, author, price, publisher } = req.body;
  const result = new Products(req.body).save();
  return result;
};

const getById = async (req) => {
  const id = req.params.id;
  const result = await Products.findById(id);
  return result;
};

const deleteProduct = async (req) => {
  const id = req.params.id;
  const checkProduct = await getById(req);
  const result = await Products.findByIdAndDelete(id);
  return result;
};

module.exports = { getAllProducts, createProduct, getById, deleteProduct };
