/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smpt.gmail.com",
  port: 465,
  secure: true,
  requireTLS: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

const sendMailUser = async(email, subject) => {
  console.log('hit');
  // const mailOptions = {
  //   from: process.env.MAIL_USERNAME,
  //   to: email,
  //   subject: `Verification account OTP`,
  //   text: `Hello this is your otp ${subject} you can go back to Izdihar Website welcome.`,
  // };
  console.log(`hit 2`);
  const info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: `Verification account OTP`,
    text: `Hello this is your otp ${subject} you can go back to Izdihar Website welcome.`,
  })
  console.log(`Email sent successfully ${info.messageId}`);
  // throw Error(error)
};

module.exports = {
  sendMailUser
}