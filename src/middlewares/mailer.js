/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  // auth: {
  //   user: process.env.MAIL_USERNAME,
  //   pass: process.env.MAIL_PASSWORD
  // }
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

module.exports = (email, subject) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: `Verification account OTP`,
    text: `Hello this is  your otp ${subject} you can go back to Izdihar Website welcome.`,
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log("Error " + err);
      console.log("email not sent!");
    } else {
      console.log("Email sent successfully");
      return "email sent successfully";
    }
  });
};