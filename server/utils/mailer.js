
import nodeMailer from 'nodemailer'
import mailConfig from '../config/mail.config.js'
import dotenv from "dotenv";
dotenv.config();


const sendMail=(to , subject , htmlContent) =>{
    console.log('a')
    const transporter = nodeMailer.createTransport({
        service:'gmail',
        auth: {
          user: mailConfig.USERNAME, // generated ethereal user
          pass: mailConfig.PASSWORD, // generated ethereal password
        },
      });
      let opotions = {
        from: mailConfig.FROM_ADDRESS, 
        to,
        subject, 
        html: htmlContent, 
      }
      return transporter.sendMail(opotions)
}
export default sendMail