const router = require("express").Router();
const controllers = require("./productController");
const { checkLogin, checkRole } = require("../../middleware/Autentikasi");

router.get("/", controllers.getAllProducts);
router.post("/add", controllers.createProduct);
router.delete("/delete/:id", controllers.deleteProduct);
router.put("/update/:id", controllers.updateProduct);

module.exports = router;
