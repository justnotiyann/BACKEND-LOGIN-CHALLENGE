const nodemailer = require("nodemailer");
const Users = require("../../models/Users");
const { StatusCodes } = require("http-status-codes");
const argon2 = require("argon2");

const renderUI = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    color: color,
    alert: alert,
  });
};
const renderUI2 = (path, title, result, res) => {
  res.render(path, {
    layout: "./layout/main",
    title: title,
    result,
  });
};

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "kellie10@ethereal.email",
    pass: "PQVGcjz7WGndWxAN7j",
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

const sendEmail = async (req, res, next) => {
  try {
    const getEmailUser = req.body.email;
    const getEmailDatabase = await Users.findOne({ email: getEmailUser });
    if (getEmailUser == "") {
      res.status(StatusCodes.BAD_REQUEST).json({ msg: "harap isi email anda" });
    } else {
      if (!getEmailDatabase) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: "email tidak ditemukan" });
      } else {
        const link = `localhost:3000/forgot/edit/${getEmailDatabase._id}`;
        const messageEmail = {
          from: "kellie10@ethereal.email",
          to: getEmailUser,
          subject: "Permohonan Ubah Password",
          html: `Silahkan ubah password dengan klik link berikut <a href=${link}>Disini</a>`,
        };
        const email = await transporter.sendMail(messageEmail);
        renderUI("forgot", "Berhasil Terkirim", "success", "Silahkan cek email anda", res);
        //    res.status(StatusCodes.OK).json({ msg: "data berhasil dikirim" });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { password } = req.body;
    const hashPass = await argon2.hash(password, 10);
    const result = await Users.findOneAndUpdate({ _id: id }, { password: hashPass });
    res.status(StatusCodes.CREATED).json({ msg: "data berhasil di update" });
  } catch (e) {
    console.log(e);
  }
};

const getFormUpdateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Users.findOne({ _id: id });
    renderUI2("ubahPass2", "Halaman ubah password", result, res);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { sendEmail, updateUser, getFormUpdateUser };
