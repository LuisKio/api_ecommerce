const transporter = require('../utils/mailer');
require('dotenv').config();

class MailerServices { 
    static async sendEmail(emailData){
        try {
            await transporter.sendMail({
                from: `<${process.env.G_USER}>`,
                to: emailData.to,
                subject: emailData.subject,
                text: emailData.text,
                html: emailData.html
            });
        } catch (error) {
            throw(error);
        }
    }
}


module.exports = MailerServices;