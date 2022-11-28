const Users = require("../users/Users");
const argon2 = require("argon2");
const servicesAuth = require("../../services/mongoose/authServices");
const { body, validationResult } = require("express-validator");
const { renderSignInSignUp } = require("../../components/signUpSignIn");

const renderSignIn = (req, res, next) => {
  try {
    renderSignInSignUp("signin", "Halaman Login", "", "", res);
  } catch (e) {
    console.log(e);
  }
};
const renderSignUp = (req, res, next) => {
  try {
    renderSignInSignUp("signup", "Halaman Daftar", "", "", res);
  } catch (e) {
    console.log(e);
  }
};
const signUp = async (req, res, next) => {
  try {
    const { email, password, confirmPass } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (email == "" || password == "") {
        renderSignInSignUp("signup", "Terjadi kesalahan", "warning", "data tidak boleh kosong", res);
      } else {
        renderSignInSignUp("signup", "Terjadi kesalahan", "warning", "harus berformat email", res);
      }
    }
    const checkEmail = await servicesAuth.getEmail(req);
    if (checkEmail) {
      renderSignInSignUp("signup", "Terjadi kesalahan", "warning", "email sudah digunakan", res);
    } else {
      if (password !== confirmPass) {
        renderSignInSignUp("signup", "Terjadi kesalahan", "warning", "Konfirmasi password tidak sama", res);
      } else {
        if (password.length <= 5) {
          renderSignInSignUp("signup", "Terjadi kesalahan", "warning", "password minimal 5 huruf", res);
        } else {
          const hashPassword = await argon2.hash(password);
          const result = new Users({
            email,
            password: hashPassword,
          }).save();
          renderSignInSignUp("signin", "Halaman Login", "success", "berhasil mendaftar silahkan login", res);
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
      renderSignInSignUp("signin", "Terjadi kesalahan", "warning", "Invalid Credentials", res);
    } else {
      const verifyPassword = await argon2.verify(getUser.password, password);
      if (!verifyPassword) {
        renderSignInSignUp("signin", "Terjadi kesalahan", "warning", "Invalid Credentials", res);
      } else {
        req.session.email = getUser.email;
        req.session.role = getUser.role;
        renderSignInSignUp("signin", "Selamat Datang", "success", "Sukses login", res);
      }
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports = { signUp, signIn, renderSignIn, renderSignUp };
