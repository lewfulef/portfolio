const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura el middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura el transporte de nodemailer (ajusta con tu configuración de correo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'l.huichalafb@gmail.com',
    pass: 'tu_contraseña'
  }
});

// Ruta para procesar el formulario y enviar el correo
app.post('/enviar-correo', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  const mailOptions = {
    from: 'tu_correo@gmail.com',
    to: 'tu_correo_destino@gmail.com',
    subject: 'Nuevo mensaje de formulario de contacto',
    text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Mensaje enviado con éxito');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
