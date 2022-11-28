const Users = require("../api/users/usersModel");
const Admin = require("../api/admin/Admin");
const { StatusCodes } = require("http-status-codes");

const checkLogin = async (req, res, next) => {
  try {
    const checkSession = req.session;
    if (!checkSession) {
      res.redirect("/signin");
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

const checkRole = async (req, res, next) => {
  try {
    const checkRole = req.session.role;
    if (checkRole !== "admin") {
      res.status(StatusCodes.FORBIDDEN).json({
        msg: "akses terlarang",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { checkLogin, checkRole };
