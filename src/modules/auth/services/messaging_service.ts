import {DomainEvents} from "../../../shared/domain/events/DomainEvents";
import {UniqueEntityID} from "../../../shared/domain/UniqueEntityID";

const nodemailer = require("nodemailer");

export class MailingService {
    private async generateAccount() {
        return {
            'user': 'apikey',
            'pass': ''
        }
        //   return await nodemailer.createTestAccount();
    }

    private async setUpTransport() {
        let testAccount = await this.generateAccount();
        return nodemailer.createTransport({
            host: "smtp.sendgrid.net",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });
    }

    async sendMailToUser(email: string, message: string) {
        let transporter = await this.setUpTransport();
        const info = await transporter.sendMail({
            from: 'saheedfaremi@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "You have requested a password reset for your Kwaluselli account. Copy the code and pass in the application. Code: " + message, // plain text body
            html: "", // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return info;
    }

    async dispatchEventNotification(id: UniqueEntityID) {
        DomainEvents.dispatchEventsForAggregate(id);
    }

}