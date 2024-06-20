const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.FROM_MAIL, // Your Gmail email address
        pass: process.env.MAIL_PASSWORD // Your Gmail password or app-specific password
    }
});

const emailSend = async (data) => {
    // Setup email data
    let mailOptions = {
        from: process.env.FROM_MAIL,  // Sender email address
        to: data.email, // Recipient email address
        subject: 'Test Email', // Subject line
        text: 'This is a test email from Node.js using Nodemailer.' // Plain text body
    };
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error occurred:', error);
        }
        console.log('Message sent:', info.messageId);
        return info;
    });
};

module.exports = { emailSend }