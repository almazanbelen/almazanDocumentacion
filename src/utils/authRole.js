//imports
const config = require("../config/config.js");

// funcion autenticadora
function auth(req, res, next) {
  if (
    req.session?.email === config.adminNAME ||
    (req.session?.email === config.adminEMAIL && req.session?.admin) ||
    req.session?.premium
  ) {
    return next();
  }
  return res.status(401).send("Error en la auntenticacion");
}

module.exports = {
  auth,
};
