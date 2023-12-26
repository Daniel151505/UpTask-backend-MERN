import nodemailer from "nodemailer";

export const emailRegister = async (data) => {
  const { email, nombre, token } = data;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7a975c5543fdb3",
      pass: "9657eccc323559",
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
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7a975c5543fdb3",
      pass: "9657eccc323559",
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
