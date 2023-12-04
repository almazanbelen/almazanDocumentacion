//imports
const config = require("../config/config");

//funcion para autenticar role
function userRole(email) {
  if (email === config.adminNAME) {
    const role = {
      role: "admin",
    };
    return role;
  }
  if (email === config.adminEMAIL) {
    const role = {
      role: "premium",
    };
    return role;
  } else {
    const role = {
      role: "user",
    };
    return role;
  }
}

//export
module.exports = userRole;
