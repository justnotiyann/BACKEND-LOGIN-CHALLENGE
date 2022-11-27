const router = require("express").Router();
const controllers = require("./productController");
const { checkLogin, checkRole } = require("../../middleware/Autentikasi");

router.get("/", checkLogin, controllers.getAllProducts);
router.post("/add", checkLogin, checkRole, controllers.createProduct);

module.exports = router;
