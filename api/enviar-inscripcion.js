const nodemailer = require('nodemailer');

async function enviarInscripcion(req, res) {
  console.log('Función enviarInscripcion llamada');
  console.log('Datos recibidos:', req.body);

  const { nombre, email, telefono, fecha_nacimiento, tipo_ticket } = req.body;

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'telecodosantos@gmail.com',
      pass: 'asermjdpkmdgcybf'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: '"Teleco Do Santos" <telecodosantos@gmail.com>',
    to: 'telecodosantos@gmail.com',
    subject: 'Nueva inscripción al evento',
    text: `
      Nueva inscripción:
      Nombre: ${nombre}
      Email: ${email}
      Teléfono: ${telefono}
      Fecha de nacimiento: ${fecha_nacimiento}
      Tipo de ticket: ${tipo_ticket}
    `,
    html: `
      <h2>Nueva inscripción:</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Fecha de nacimiento:</strong> ${fecha_nacimiento}</p>
      <p><strong>Tipo de ticket:</strong> ${tipo_ticket}</p>
    `
  };

  try {
    console.log('Intentando enviar correo...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito:', info.response);
    res.status(200).json({ message: 'Inscripción enviada con éxito' });
  } catch (error) {
    console.error('Error detallado al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar la inscripción', details: error.message });
  }
}

module.exports = enviarInscripcion;