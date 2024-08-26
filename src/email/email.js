import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import { emailHtml } from "./emailHtml.js";


export const sendEmail = async(email)=>{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${ process.env.SECRET_EMAIL}`,
      pass: `${process.env.SECRET_PASSWORD}`,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });


jwt.sign({email} , process.env.SECRET_KEY_EMAIL,async(err,token)=>{

  const info1 = await transporter.sendMail({
    from: `"E-Shop App" ${process.env.SECRET_EMAIL}`,
    to: email,
    subject: "Welcome to E-Shop",
    html:emailHtml(token),
  });
})
}







export  const sendCode =async (email , html)=>{

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${ process.env.SECRET_EMAIL}`,
      pass: `${process.env.SECRET_PASSWORD}`,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  // const otp = Math.floor(100000 + Math.random() * 900000);

  const info = await transporter.sendMail({
    from: `"E-Shop App" <${ process.env.SECRET_EMAIL}>`,
    to: email,
    subject: "Code for reset password " ,
    html: html ,
  });

}





