const Users = require("../users/Users");
const argon2 = require("argon2");
const { body, validationResult } = require("express-validator");
const servicesAuth = require("../../services/mongoose/authServices");

const renderFormLogin = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    color,
    alert,
  });
};

const signUp = async (req, res, next) => {
  try {
    const { email, password, confirmPass } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (email == "" || password == "") {
        renderFormLogin("signup", "Terjadi kesalahan", "warning", "data tidak boleh kosong", res);
      } else {
        renderFormLogin("signup", "Terjadi kesalahan", "warning", "harus berformat email", res);
      }
    }
    const checkEmail = await servicesAuth.getEmail(req);
    if (checkEmail) {
      renderFormLogin("signup", "Terjadi kesalahan", "warning", "email sudah digunakan", res);
    } else {
      if (password !== confirmPass) {
        renderFormLogin("signup", "Terjadi kesalahan", "warning", "Konfirmasi password tidak sama", res);
      } else {
        if (password.length <= 5) {
          renderFormLogin("signup", "Terjadi kesalahan", "warning", "password minimal 5 huruf", res);
        } else {
          const hashPassword = await argon2.hash(password);
          const result = new Users({
            email,
            password: hashPassword,
          }).save();
          renderFormLogin("signin", "Halaman Login", "success", "berhasil mendaftar silahkan login", res);
        }
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
      renderFormLogin("signin", "Terjadi kesalahan", "warning", "Invalid Credentials", res);
    } else {
      const verifyPassword = await argon2.verify(getUser.password, password);
      if (!verifyPassword) {
        renderFormLogin("signin", "Terjadi kesalahan", "warning", "Invalid Credentials", res);
      } else {
        req.session.email = getUser.email;
        req.session.role = getUser.role;
        renderFormLogin("signin", "Selamat Datang", "success", "Sukses login", res);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { signUp, signIn };
