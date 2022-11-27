const router = require("express").Router();
const controllers = require("./authController");
const { body, validationResult } = require("express-validator");

const renderUI = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    color,
    alert,
  });
};

router.get("/signin", (req, res) => {
  renderUI("signin", "Halaman Login", "", "", res);
});

router.get("/signup", (req, res) => {
  renderUI("signup", "Halaman Daftar", "", "", res);
});

router.post("/signup", body("email").isEmail(), controllers.signUp);
router.post("/signin", body("email").isEmail(), controllers.signIn);

module.exports = router;
