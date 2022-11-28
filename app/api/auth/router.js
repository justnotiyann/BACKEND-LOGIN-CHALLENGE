const router = require("express").Router();
const controllerAuth = require("./authController");
const { body, validationResult } = require("express-validator");
const { renderSignInSignUp } = require("../../components/components");

router.get("/signin", controllerAuth.renderSignIn);
router.get("/signup", controllerAuth.renderSignUp);
router.post("/signup", body("email").isEmail(), controllerAuth.signUp);
router.post("/signin", body("email").isEmail(), controllerAuth.signIn);

module.exports = router;
