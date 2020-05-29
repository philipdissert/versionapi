//const nodemailer = require("nodemailer");
//const sendmail = require('sendmail')();
const jwt = require('jsonwebtoken'); 

module.exports = async function (id, mail) {

    const emailToken = jwt.sign({user: id}, process.env.EMAIL_SECRET, {expiresIn: '1d'});
    const url = `http://localhost:3000/confirmation/${emailToken}`;   
    console.log(url);
    
    
    
    
    /**
    
        sendmail({
            from: 'no-reply@yourdomain.com',
            to: mail,
            subject: 'test sendmail',
            html: 'Mail of test sendmail ',
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
        });

    

    /*
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
    },
    });

    
    const url = `http://localhost:3000/confirmation/${emailToken}`;    

    try {        
        const info = await transporter.sendMail({
            from: '"Pi Diddy" <philip.dissert@gmail.com>',
            to: mail,
            subject: 'Confirm Email',
            html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
        });             
        console.log(info);
    } catch (err) {
        console.log(err);
    }
*/
    
}