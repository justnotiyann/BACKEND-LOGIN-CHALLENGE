const router = require("express").Router();
const controllers = require("./productController");
const { checkLogin } = require("../../middleware/Autentikasi");

router.get("/", checkLogin, controllers.getAllProducts);
router.post("/add", checkLogin, controllers.createProduct);

module.exports = router;
