const Users = require("../users/Users");
const argon2 = require("argon2");
const { body, validationResult } = require("express-validator");
const servicesAuth = require("../../services/mongoose/authServices");

const renderUI = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    color,
    alert,
  });
};

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (email == "" || password == "") {
        renderUI("signin", "Terjadi kesalahan", "warning", "data tidak boleh kosong", res);
      } else {
        renderUI("signin", "Terjadi kesalahan", "warning", "harus berformat email", res);
      }
    }
    const checkEmail = await servicesAuth.getEmail(req);
    if (checkEmail) {
      renderUI("signin", "Terjadi kesalahan", "warning", "email sudah digunakan", res);
    } else {
      if (password.length <= 3) {
        renderUI("signin", "Terjadi kesalahan", "warning", "password minimal 3 huruf", res);
      } else {
        const hashPassword = await argon2.hash(password);
        const result = new Users({
          email,
          password: hashPassword,
        }).save();
        renderUI("signin", "Halaman Login", "success", "berhasil mendaftar silahkan login", res);
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
      renderUI("signin", "Terjadi kesalahan", "warning", "Invalid Credentials", res);
    } else {
      const verifyPassword = await argon2.verify(getUser.password, password);
      if (!verifyPassword) {
        renderUI("signin", "Terjadi kesalahan", "warning", "Invalid Credentials", res);
      } else {
        req.session.email = getUser.email;
        req.session.role = getUser.role;
        renderUI("signin", "Selamat Datang", "success", "Sukses login", res);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { signUp, signIn };
