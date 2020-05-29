//const nodemailer = require("nodemailer");
//const sendmail = require('sendmail')();
const jwt = require('jsonwebtoken'); 
const User = require('./model/User');

module.exports = async function (req, res) {

    if(!req.user) res.status(400).send('Access Denied');
    const user = await User.findOne({ _id: req.user});    
    
    const emailToken = jwt.sign({user: id}, process.env.EMAIL_SECRET, {expiresIn: '1d'});
    const url = `http://localhost:3000/api/emailverify/conf/${emailToken}`;   
    console.log(url);
    console.log(user.email);
    
    
    
    
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