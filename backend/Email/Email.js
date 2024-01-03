const mailer = require('nodemailer')
require('dotenv').config()

function Create(item) {
    let mailtransporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Auth_mail,
            pass: process.env.Auth_pass
        }
    });

    let malingdetail = {
        from:process.env.Auth_mail,
        to:item.email,
        subject:"NEW USER DETAIL",
        text:`Now you are new user in subki dukkan 
        name:${item.name}
        E-mail:${item.email}   
        Phone NO.:${item.phone} 
        thank you for Creating account in my Website `
    };
    mailtransporter.sendMail(malingdetail,function(err,data){
        if(err){
            console.log(err.message)
        }else(
            console.log("mail send")
        )
    })
}

function sendopt (otp,item) {
    let mailtransporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.Auth_mail,
            pass: process.env.Auth_pass
        }
    });

    let malingdetail = {
        from:process.env.Auth_mail,
        to:item,
        subject:"Forget Password",
        text:` Your Reset password OTP is ${otp} Enter this OTP and Create a New Password In SABKI DUKAAN `
    };
    mailtransporter.sendMail(malingdetail,function(err,data){
        if(err){
            console.log(err.message)
        }else(
            console.log("mail send")
        )
    })
}
module.exports = {Create,sendopt}
