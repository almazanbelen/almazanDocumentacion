//imports
const config = require("../config/config.js");

// funcion autenticadora
function auth(req, res, next) {
  if (
    req.session.user.role == "user"
  ) {
    console.log(req.session.user.role)
    return res.status(401).send("Error en la auntenticacion");
  }
  return next();
  
}

function authAdmin(req, res, next) {
  if (
    req.session.user.role == "user" || req.session.user.role == "premium"
  ) {
    console.log(req.session.user.role)
    return res.status(401).send("Error en la auntenticacion, debes ser administrador");
  }
  return next();
  
}

module.exports = {
  auth,
  authAdmin
};
