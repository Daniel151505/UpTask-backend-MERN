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
