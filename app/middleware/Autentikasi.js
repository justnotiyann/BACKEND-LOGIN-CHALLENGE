const Users = require("../models/Users");
const Admin = require("../models/Admin");
const { StatusCodes } = require("http-status-codes");

const checkLogin = async (req, res, next) => {
  try {
    const checkSession = req.session.email;
    if (!checkSession) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        msg: "harap login ke akun anda",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { checkLogin };
