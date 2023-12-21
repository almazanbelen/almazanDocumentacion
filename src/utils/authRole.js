const config = require("../config/config");

// funcion autenticadora
function auth(req, res, next) {
  if (req.session?.email == config.adminNAME || config.adminEMAIL) {
    return next();
  }
  console.log(req.session.email);
  return res.status(401).send("Error en la auntenticacion");
}

function authAdmin(req, res, next) {
  if (req.session?.email == config.adminNAME) {
    return next();
  }
  console.log(req.session);
  return res
    .status(401)
    .send("Error en la auntenticacion, debes ser administrador");
}

module.exports = {
  auth,
  authAdmin,
};
