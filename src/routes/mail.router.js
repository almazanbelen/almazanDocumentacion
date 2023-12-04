//imports
const { Router } = require("express");
const mailControllers = require("../controllers/mailControllers");

const router = Router();

//vista para enviar correo
router.get("/", mailControllers.getMail);

//enviar correo
router.post("/enviar-correo", mailControllers.postMail);

module.exports = router;
