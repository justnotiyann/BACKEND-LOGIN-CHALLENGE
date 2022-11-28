const router = require("express").Router();
const controllers = require("./productController");
const { checkLogin, checkRole } = require("../../middleware/Autentikasi");

router.get("/", controllers.getAllProducts);
router.post("/add", controllers.createProduct);

module.exports = router;
