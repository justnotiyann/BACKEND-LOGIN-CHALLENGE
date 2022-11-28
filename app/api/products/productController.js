const Products = require("./productsModel");
const productServices = require("../../services/mongoose/productServices");
const { StatusCodes } = require("http-status-codes");

const getAllProducts = async (req, res, next) => {
  try {
    const result = await productServices.getAllProducts();
    if (result <= 0) {
      res.status(StatusCodes.OK).json({
        msg: "data belum tersedia",
      });
    }
    res.status(StatusCodes.OK).json({
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
const deleteProduct = async (req, res, next) => {
  try {
    const checkProduct = await productServices.getById(req);
    if (!checkProduct) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "Data tidak ditemukan" });
    } else {
      const result = await productServices.deleteProduct(req);
      res.status(StatusCodes.OK).json({ msg: "data berhasil dihapus" });
    }
  } catch (e) {
    console.log(e);
  }
};
const updateProduct = async (req, res, next) => {
  try {
    const result = await productServices.updateProduct(req);
    if (!result) {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "terjadi kesalahan" });
    }
    res.status(StatusCodes.CREATED).json({ msg: "data berhasil diupdate" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { getAllProducts, createProduct, deleteProduct, updateProduct };
