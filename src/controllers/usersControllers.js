//imports
const { isValidatePassword } = require("../utils/utils");
const userService = require("../dao/factory/factoryUsers.js");
const config = require("../config/config");
const userRole = require("../utils/usersRole.js");
const jwt = require("jsonwebtoken");

//login
async function getLogin(req, res) {
  res.render("login");
}
async function postLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render("login", { error: "Valores erroneos" });
  }

  const user = await userService.postLogin(email);

  if (!user) {
    return res.status(400).render("login", { error: "Usuario no encontrado" });
  }
  //validacion de acceso privado
  if (
    email === config.adminNAME ||
    (email === config.adminEMAIL && isValidatePassword(user, password))
  ) {
    req.session.email = email;
    res.redirect("/api/sessions/private");
    if (!isValidatePassword(user, password)) {
      return res.status(401).render("login", { error: "Error en password" });
    }
  } else {
    // Set the user session here if login is successful
    req.session.user = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    };
    // Redirect the user after successful login
    res.redirect("/api/sessions/profile");
  }
}

//private
async function getPrivate(req, res) {
  res.render("private");
}

//register
async function getRegister(req, res) {
  res.render("register");
}
async function postRegister(req, res) {
  const { first_name, last_name, email, age, password } = req.body;
  const { role } = userRole(email);

  if (!first_name || !last_name || !email || !age || !password || !role) {
    return res.status(400).send("Faltan datos.");
  } else {
    const user = userService.postRegister(
      first_name,
      last_name,
      email,
      age,
      password,
      role
    );

    res
      .send({ payload: "usuario registrado con éxito" })
      .redirect("/api/sessions/login");
  }
}

//login con GitHub
async function getLoginGit(req, res) {
  req.session.user = req.user;
  res.redirect("/api/sessions/profile");
}

//profile
async function getProfile(req, res) {
  if (!req.session.user) {
    return res.redirect("login");
  }
  const { first_name, last_name, email, age, role } = req.session.user;
  res.render("profile", {
    first_name,
    last_name,
    age,
    email,
    role,
  });
}

//fail auth
async function failRegister(req, res) {
  console.log("Falla en autenticacion");
  res.send({ error: "Falla" });
}
async function failLogin(req, res) {
  console.log("Falla en autenticacion");
  res.send({ error: "Falla" });
}

//logout
async function logout(req, res) {
  delete req.session.user;
  res.redirect("login");
}

//restore
async function getRestore(req, res) {
  const token = req.params.token;
  res.render("restore", { token });
}
async function postRestore(req, res) {
  const token = req.params.token;
  //crear token para enviar correo de restauracion de contraseña
  jwt.verify(token, "CoderKey", async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.redirect("/api/sessions/login");
    } else {
      const { email, password } = req.body;
      const user = await userService.findUser(email);
      if (!user) {
        return res
          .status(400)
          .send({ status: "error", error: "Usuario no encontrado" });
      }
      if (isValidatePassword(user, password)) {
        res.send({ error: "Ingrese una contraseña diferente a la anterior" });
      } else {
        const userFound = await userService.postRestore(email, password);
        res.redirect("/api/sessions/login");
      }
    }
  });
}
//subir archivos
async function postFiles(req, res) {
  const { uid } = req.params;
  const { name } = req.body;
  const file = req.file;
  const result = await userService.postFiles(uid, name, file);
  res.status(200).send({ result: "Success" });
}

//cambio de rol del usuario
async function putRole(req, res) {
  const { uid } = req.params;
  const user = await userService.findUserById(uid);
  if (
    (user.role === "user" && user.documents.length >= 2) ||
    user.role === "premium"
  ) {
    const result = await userService.putRole(uid);
    res.status(200).send({ result: "Success" });
  } else {
    res.send({ error: "Faltan documentos" });
  }
}

//current para jwt
function current(req, res) {
  res.send(req.user);
}

module.exports = {
  getLogin,
  postLogin,
  getPrivate,
  getRegister,
  postRegister,
  getLoginGit,
  getProfile,
  failRegister,
  failLogin,
  logout,
  getRestore,
  postRestore,
  postFiles,
  putRole,
  current,
};
