//imports
const dotenv = require("dotenv");

//instancia del ambiente de produccion/desarrollo
const enviroment = "DEVELOPMENT";

//congig del .env
dotenv.config({
  path:
    enviroment === "DEVELOPMENT" ? "./.env.development" : "./.env.production",
});

//exports
module.exports = {
  port: process.env.PORT || 8080,
  mongoURL: process.env.MONGO_URL,
  mongoURLtest: process.env.MONGO_URL_TEST,
  adminNAME: process.env.ADMIN_NAME,
  twilioACCOUNT: process.env.TWILIO_ACCOUNT,
  twilioAUTH: process.env.TWILIO_AUTH,
  twilioSMS: process.env.TWILIO_SMS,
  adminEMAIL: process.env.ADMIN_EMAIL,
  enviroment: process.env.NODE_ENV,
  persistence: process.env.PERSISTENCE,
  jwtKey: process.env.PRIVATE_KEY,
};
