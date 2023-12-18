//imports
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { auth } = require("../utils/authRole");
const usersController = require("../controllers/usersControllers");
const upload = require("../utils/multer.js");
const User = require("../dao/models/User.js");

//login
router.get("/login", usersController.getLogin);

router.post("/login", usersController.postLogin);

//private
router.get("/private", auth, usersController.getPrivate);

//register
router.get("/register", usersController.getRegister);

router.post(
  "/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }),
  usersController.postRegister
);

//login github
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  usersController.getLoginGit
);

//profile
router.get("/profile", usersController.getProfile);

//fail auth
router.get("/failregister", usersController.failRegister);

//fail login
router.get("/faillogin", usersController.failLogin);

//logout
router.get("/logout", usersController.logout);

//restore
router.get("/restore/:token", usersController.getRestore);

router.post("/restore/:token", usersController.postRestore);

//cambio de rol de usuario
router.put("/premium/:uid", usersController.putRole);

//current para jwt
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  usersController.current
);

router.post("/:uid/documents", upload.single("file"), usersController.postFiles);

module.exports = router;
