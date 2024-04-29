import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const info = await transport.sendMail({
  from: '"UpTask - Project Manager" <accounts@uptask.com>',
  to: email,
  subject: "UpTask - Check your account",
  html: `<p>Hello ${nombre},</p>
  <p>Your account is almost ready, you just have to check it at the following link:</p>
  <p><a href="${process.env.FRONTEND_URL}/confirm/${token}">Check Account</a></p>
  <p>If you did not create this account, you can ignore this message.</p>`,
  });
};

export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Información del email
const info = await transport.sendMail({
  from: '"UpTask - Project Manager" <accounts@uptask.com>',
  to: email,
  subject: "UpTask - Reset your Password",
  html: `<p>Hello ${nombre},</p>
  <p>You have requested to reset your password. Follow the following link to generate a new one:</p>
  <p><a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset Password</a></p>
  <p>If you did not request this change, you can ignore this message.</p>`,
  });
};