//imports
const config = require("../config/config.js");
const jwt = require("jsonwebtoken");

//funcion generadora de token
const generateToken = (user) => {
  const token = jwt.sign({ user }, config.jwtKey, { expiresIn: "1h" });
  return token;
};

//funcion autenticadora
const authToken = (req, res, next) => {
  const autHeader = req.headers.authorization;
  if (!autHeader) return res.status(401).send({ error: "No autenticado" });
  const token = autHeader.split(" ")[1];
  jwt.verify(token, config.jwtKey, (error, credentials) => {
    if (error) return res.status(403).send({ error: "No autorizado" });
    req.user = credentials.user;
    next();
  });
};

//exports
module.exports = { generateToken, authToken };
