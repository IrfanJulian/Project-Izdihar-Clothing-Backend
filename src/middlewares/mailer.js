/* eslint-disable no-undef */
// const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')
// const sendEmail = async (email) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD
//       }
//     })
//     const token = jwt.sign({ email }, process.env.JWT_KEY, {
//       expiresIn: '24h'
//     })
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: 'Recipedia', // sender address
//       to: email, // list of receivers
//       subject: 'User Activation', // Subject line
//       html: `This is your token ${token}` // html body
//     })

//     console.log('Message sent: %s', info.messageId)
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//   } catch (error) {
//     console.log(error)
//   }
// }

// module.exports = {
//   sendEmail
// }


/* eslint-disable no-undef */
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD
//   }
// });

// const sendEmailUser = async(email, subject) => { 
//   const options = {
//     from: process.env.MAIL_USERNAME,
//     to: email,
//     subject: `Verification Account`,
//     text: `This is your OTP code ${subject} you can go back to Izdihar Website`
//   }
//   transporter.sendMail(options, function (err){
//     if(err){
//       console.log(err);
//     }
//     console.log(`email sent`);
//   })
// }

// module.exports = sendEmailUser

const nodemailer = require("nodemailer");

const sendGmail = async(email, subject) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
  
    // const options = {
    //   from: process.env.MAIL_USERNAME,
    //   to: email,
    //   subject: `Verification Account`,
    //   text: `This is your OTP code ${subject} you can go back to Izdihar Website`
    // }
  
    let info = await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: `Verification Account`,
      text: `This is your OTP code ${subject} you can go back to Izdihar Website`
    })
    console.log('email sent');
    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {sendGmail}

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