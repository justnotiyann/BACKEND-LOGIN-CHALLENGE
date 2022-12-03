const Users = require("../users/usersModel");
const argon2 = require("argon2");
const transporter = require("./nodemailer");
const {
  renderSignInSignUpForgot,
  renderForgotEjs,
  renderUbahPassForm,
  renderAlert,
} = require("../../components/components");

const renderPage = (req, res, next) => {
  try {
    renderSignInSignUpForgot("forgot", "Halaman ubah password", "", "", res);
  } catch (e) {
    console.log(e);
  }
};
const sendEmail = async (req, res, next) => {
  try {
    const getEmailUser = req.body.email;
    const getEmailDatabase = await Users.findOne({ email: getEmailUser });
    if (getEmailUser == "") {
      renderForgotEjs(
        "forgot",
        "Terjadi kesalahan",
        "warning",
        "Harap isi email anda",
        res
      );
    } else {
      if (!getEmailDatabase) {
        renderForgotEjs(
          "forgot",
          "Terjadi kesalahan",
          "warning",
          "Email tidak ditemukan",
          res
        );
      } else {
        const link = `localhost:3000/forgot/edit/${getEmailDatabase._id}`;
        const messageEmail = {
          from: "muhammadfitrian0712@gmail.com",
          to: getEmailUser,
          subject: "Permohonan Ubah Password",
          html: `Silahkan ubah password dengan klik link berikut <a href=${link}>Disini</a>`,
        };
        const email = await transporter.sendMail(messageEmail);
        renderForgotEjs(
          "forgot",
          "Berhasil Terkirim",
          "success",
          "Silahkan cek email anda",
          res
        );
      }
    }
  } catch (e) {
    console.log(e);
  }
};
const getFormUpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.findOne({ _id: id });
    renderUbahPassForm(
      "ubah-pass-form",
      "Halaman reset password",
      "",
      "",
      result,
      res
    );
  } catch (e) {
    console.log(e);
  }
};
const updateUser = async (req, res) => {
  try {
    const { email, password, confirmPass } = req.body;
    let alert;
    if (password !== confirmPass) {
      alert = "Password dan konfirmasi password tidak ! sama,";
      renderAlert("alert", "Terjadi kesalahan", "warning", alert, res);
    } else if (password.length <= 5) {
      alert = "Password minimal 5 karakter";
      renderAlert("alert", "Terjadi kesalahan", "warning", alert, res);
    } else {
      const hashPass = await argon2.hash(password, 10);
      const result = await Users.findOneAndUpdate(
        { email: email },
        { password: hashPass }
      );
      alert = `berhasil ubah password, silahkan <a href="/auth/signin">Login disini</a>`;
      renderUbahPassForm(
        "ubah-pass-form",
        "Halaman reset password",
        "success",
        alert,
        result,
        res
      );
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { renderPage, sendEmail, updateUser, getFormUpdateUser };
