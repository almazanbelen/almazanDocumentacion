//imports
const config = require("../config/config");
const { generateToken } = require("../utils/jwt");
const transporter = require("../utils/nodemailer");

//render vista para enviar correo
async function getMail(req, res) {
  res.render("mail");
}

//enviar correo
async function postMail(req, res) {
  const { email } = req.body;
  const token = generateToken(email);
  const mailOptions = {
    from: config.adminEMAIL,
    to: email,
    subject: "Recuperar contraseña",
    html: `
    <div>
        <h2>Tienes 60 minutos para reestablecer tu contraseña ingresando al siguiente</h2>
        <h2>
          <a href="http://localhost:8080/api/sessions/restore/${token}">Link de restablecimiento de contraseña</a>   
        </h2>
           
    </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("Error de envio");
    } else {
      console.log("Correo enviado", info.response);
      res.send(
        `Correo enviado con éxito a ${email}, codigo de acceso: ${token}`
      );
    }
  });
}

//exports
module.exports = {
  getMail,
  postMail,
};
