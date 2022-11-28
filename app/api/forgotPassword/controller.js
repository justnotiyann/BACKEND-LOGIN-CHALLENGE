const nodemailer = require("nodemailer");
const Users = require("../../models/Users");
const { StatusCodes } = require("http-status-codes");
const argon2 = require("argon2");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "grover.oberbrunner44@ethereal.email",
    pass: "tCnjckva6jq3YdxT6g",
  },
});
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const renderForgotEjs = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
  });
};
const renderUbahPass2 = (path, title, color, alert, result, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
    result,
  });
};

const sendEmail = async (req, res, next) => {
  try {
    const getEmailUser = req.body.email;
    const getEmailDatabase = await Users.findOne({ email: getEmailUser });
    if (getEmailUser == "") {
      renderForgotEjs("forgot", "Terjadi kesalahan", "warning", "Harap isi email anda", res);
    } else {
      if (!getEmailDatabase) {
        renderForgotEjs("forgot", "Terjadi kesalahan", "warning", "Email tidak ditemukan", res);
      } else {
        const link = `localhost:3000/forgot/edit/${getEmailDatabase._id}`;
        const messageEmail = {
          from: "muhammadfitrian0712@gmail.com",
          to: getEmailUser,
          subject: "Permohonan Ubah Password",
          html: `Silahkan ubah password dengan klik link berikut <a href=${link}>Disini</a>`,
        };
        const email = await transporter.sendMail(messageEmail);
        renderForgotEjs("forgot", "Berhasil Terkirim", "success", "Silahkan cek email anda", res);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPass = await argon2.hash(password, 10);
    const result = await Users.findOneAndUpdate({ email: email }, { password: hashPass });
    const link = `berhasil ubah password, silahkan <a href="/signin">Login disini</a>`;
    renderUbahPass2("ubah-pass-form", "Halaman reset password", "success", link, result, res);
    // renderUbahPass2("ubah-pass-form", "Halaman reset password", result, res);
    // res.status(StatusCodes.CREATED).json({ msg: "data berhasil di update" });
  } catch (e) {
    console.log(e);
  }
};

const getFormUpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.findOne({ _id: id });
    renderUbahPass2("ubah-pass-form", "Halaman reset password", "", "", result, res);
    // renderUbahPass2("ubahPass2", "Halaman ubah password", result, res);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendEmail, updateUser, getFormUpdateUser };
