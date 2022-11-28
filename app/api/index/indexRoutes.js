const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ msg: "hai" });
});

module.exports = router;
