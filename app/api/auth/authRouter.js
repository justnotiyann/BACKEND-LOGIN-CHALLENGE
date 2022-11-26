const router = require("express").Router();
const controllers = require("./authController");
const { body, validationResult } = require("express-validator");

router.post("/signup", body("email").isEmail(), controllers.signUp);
router.post("/signin", body("email").isEmail(), controllers.signIn);

module.exports = router;
