const renderSignInSignUp = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
  });
};

module.exports = { renderSignInSignUp };
