//imports
const { TWILIO_SMS_NUMBER, client } = require("../utils/twilio");

//enviar mensaje
async function postSms(req, res) {
  const { phone } = req.body;
  let result = await client.messages.create({
    body: "Le damos la bienvenida a ecommerce",
    from: TWILIO_SMS_NUMBER,
    to: phone,
  });
  res.send({ result: "Mensaje enviado", payload: result });
}

//exports
module.exports = {
  postSms,
};
