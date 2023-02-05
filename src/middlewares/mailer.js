/* eslint-disable no-undef */
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

const sendEmailUser = async(email, subject) => { 
  const options = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: `Verification Account`,
    text: `This is your OTP code ${subject} you can go back to Izdihar Website`
  }
  transporter.sendMail(options, function (err){
    if(err){
      console.log(err);
    }
    console.log(`email sent`);
  })
}

module.exports = sendEmailUser

// const transporter = nodemailer.createTransport({
//   service: "hotmail",
//   // host: "smpt.gmail.com",
//   // port: 465,
//   // secure: true,
//   // requireTLS: true,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD
//   }
// });

// const sendMailUser = async(email, subject) => {
//   console.log('hit');
//   // const mailOptions = {
//   //   from: process.env.MAIL_USERNAME,
//   //   to: email,
//   //   subject: `Verification account OTP`,
//   //   text: `Hello this is your otp ${subject} you can go back to Izdihar Website welcome.`,
//   // };
//   // console.log(`hit 2`);
//   const info = await transporter.sendMail({
//     from: process.env.MAIL_USERNAME,
//     to: email,
//     subject: `Verification account OTP`,
//     text: `Hello this is your otp ${subject} you can go back to Izdihar Website welcome.`,
//   })
//   console.log(`Email sent successfully ${info}`);
//   // throw Error(error)
// };

// // const sendEmail = {
// //   Activation: async(data) =>{
// //       const info = await transporter.sendMail({
// //         from: process.env.MAIL_USERNAME,
// //         to: data.email,
// //         subject: `Verification account OTP`,
// //         text: `Hello this is your otp ${data.otp} you can go back to Izdihar Website welcome.`,
// //       })
// //       console.log('Message sent: %s', info.messageId)
// //   }
// // }

// module.exports = sendMailUser