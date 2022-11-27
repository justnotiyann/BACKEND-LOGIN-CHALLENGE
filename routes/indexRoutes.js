const router = require("express").Router();

const renderUI = (path, title, header, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    header: header,
  });
};

router.get("/", (req, res) => {
  renderUI("index", "Halaman login", "login", res);
});
router.get("/", (req, res) => {
  renderUI("index", "Halaman login", "login", res);
});

module.exports = router;
