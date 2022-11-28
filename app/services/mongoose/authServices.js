const Users = require("../../api/users/Users");

const getEmail = async (req) => {
  const result = await Users.findOne({ email: req.body.email });
  return result;
};

module.exports = { getEmail };
