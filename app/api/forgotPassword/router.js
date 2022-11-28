const router = require("express").Router();
const controller = require("./controller");

const renderUI = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    color: color,
    alert: alert,
  });
};

router.get("/", (req, res) => {
  renderUI("forgot", "Halaman ubah password", "", "", res);
});
router.post("/", controller.sendEmail);
router.get("/edit/:id", controller.getFormUpdateUser);
router.post("/change", controller.updateUser);

module.exports = router;
