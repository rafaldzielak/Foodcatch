import nodeMailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodeMailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default function sendEmail(receiver: string, subject: string, html: string) {
  const mailOptions = { from: process.env.EMAIL_USER, to: receiver, subject, html: html };
  transport.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    console.log("SENT: " + info?.response);
  });
}
