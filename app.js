const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const ejsLayout = require("express-ejs-layouts");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
require("dotenv").config();

// Session
var store = new MongoDBStore({
  uri: process.env.DATABASE,
  collection: "col_session",
});

app.use(
  session({
    secret: process.env.SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 1, // 1 hour
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

app.listen(3000, () => {
  console.log("server berjalan");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
const authRoutes = require("./app/api/auth/authRouter");
const productRoutes = require("./app/api/products/productRouter");
// const indexRoutes = require("./routes/indexRoutes");
// app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/products", productRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    msg: "routes tidak ditemukan",
  });
});

module.exports = app;
