const renderSignInSignUpForgot = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
  });
};
const renderForgotEjs = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
  });
};
const renderUbahPassForm = (path, title, color, alert, result, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
    result,
  });
};
const renderAlert = (path, title, color, alert, res) => {
  res.render(path, {
    layout: "./layout/main",
    title,
    color,
    alert,
  });
};

module.exports = { renderSignInSignUpForgot, renderForgotEjs, renderUbahPassForm, renderAlert };
