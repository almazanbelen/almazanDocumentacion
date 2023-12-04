//imports
const twilio = require("twilio");
const config = require("../config/config");

const TWILIO_ACCOUNT_SID = config.twilioACCOUNT;
const TWILIO_AUTH_TOKEN = config.twilioAUTH;
const TWILIO_SMS_NUMBER = config.twilioSMS;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

//exports
module.exports = {
  TWILIO_SMS_NUMBER,
  client,
};
