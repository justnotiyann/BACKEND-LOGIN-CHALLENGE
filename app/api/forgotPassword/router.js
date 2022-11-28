const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.renderPage);
router.post("/", controller.sendEmail);
router.get("/edit/:id", controller.getFormUpdateUser);
router.post("/change", controller.updateUser);

module.exports = router;
