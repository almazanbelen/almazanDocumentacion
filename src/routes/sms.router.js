//imports
const { Router } = require("express");
const smsConrollers = require("../controllers/smsControllers");

const router = Router();

//enviar sms
router.post("/", smsConrollers.postSms);

module.exports = router;
