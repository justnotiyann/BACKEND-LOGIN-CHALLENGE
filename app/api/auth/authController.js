const Users = require("../../models/Users");
const argon2 = require("argon2");
const { body, validationResult } = require("express-validator");
const servicesAuth = require("../../services/mongoose/authServices");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (email == "" || password == "") {
        return res.status(400).json({
          msg: "data tidak boleh kosong",
        });
      } else {
        return res.status(400).json({ msg: "harus berformat email" });
      }
    }
    const checkEmail = await servicesAuth.getEmail(req);
    if (checkEmail) {
      res.status(400).json({
        msg: "email sudah digunakan ",
      });
    } else {
      if (password.length <= 3) {
        res.status(400).json({ msg: "password minimal 3 karakter" });
      } else {
        const hashPassword = await argon2.hash(password);
        const result = new Users({
          email,
          password: hashPassword,
        }).save();
        res.status(200).json({
          msg: "data berhasil dibuat",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const getUser = await servicesAuth.getEmail(req);
    if (!getUser) {
      res.status(400).json({
        msg: "Invalid Credentials",
      });
    } else {
      const verifyPassword = await argon2.verify(getUser.password, password);
      if (!verifyPassword) {
        res.status(400).json({
          msg: "Invalid Credentials",
        });
      } else {
        req.session.email = getUser.email;
        res.status(200).json({
          msg: "selamat datang",
        });
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { signUp, signIn };
