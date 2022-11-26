const Products = require("../../models/Products");
const productServices = require("../../services/mongoose/productServices");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.getAllProducts();
    if (result <= 0) {
      res.status(200).json({
        msg: "data belum tersedia",
      });
    }
    res.status(200).json({
      msg: "berikut data",
      data: result,
    });
  } catch (e) {
    console.log(e);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const result = await productServices.createProduct(req);
    if (!result) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "terjadi kesalahan" });
    res.status(StatusCodes.CREATED).json({ msg: "data berhasil dibuat" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAllProducts, createProduct };
