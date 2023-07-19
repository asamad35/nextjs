import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'

export const sendEmail= async({email,emailType,userId}: any)=>{
    enum emailEnum {
        Verify='VERIFY',
        Reset= 'RESET'
    }
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)

        if(emailType=== emailEnum.Verify){
            await  User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry: Date.now() +3600000})
        }
        else if(emailType === emailEnum.Reset){
            await  User.findByIdAndUpdate(userId,{forgetPasswordToken:hashedToken,forgetPasswordExpiry: Date.now() +3600000})
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "d1d35ade7530f0",
            pass: "4c541318bfda40"
            }
        });

        const mailOptions = {
            from: 'samad.abdus3535@gmail.com',
            to: email,
            subject: emailType === emailEnum.Verify ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === emailEnum.Verify ? 'verifyemail' : 'forgotpassword' }?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}
