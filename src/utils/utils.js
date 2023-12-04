//imports
const bcrypt = require("bcrypt");

//crear hash
const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//validar hash
const isValidatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

//exports
module.exports = {
  createHash,
  isValidatePassword,
};
