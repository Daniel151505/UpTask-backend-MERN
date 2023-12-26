import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, nombre, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information

  await transport.sendMail({
    from: '"UpTask - Project Manager" <accounts@uptask.com>', 
    to: email, 
    subject: "Check Your Account", 
    text: "Check Your Account on UpTask",
    html: `
        <p>Hello: ${nombre}, Check your account on UpTask </p>
        <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Check Account</a>
        <p> If you did not create this account, you can ignore the message </p>
    `
  })
};

export const emailForgotPassword = async (data) => {
  const { email, nombre, token } = data;

  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email information

  await transport.sendMail({
    from: '"UpTask - Project Manager" <accounts@uptask.com>', 
    to: email, 
    subject: "Reset your Password now", 
    text: "Reset your password",
    html: `
        <p>Hello: ${nombre}, follow the following link to generate a new password</p>
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset password</a>
        <p> If you did not request the change, you can ignore the message </p>
    `
  })
};
