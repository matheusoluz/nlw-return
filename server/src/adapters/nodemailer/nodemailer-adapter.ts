import nodemailer from "nodemailer";
import { SendMailData, MailAdapter } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "419a758b5f279f",
    pass: "e16b0ab2397f7a",
  },
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Matheus Luz <matheus.luz12@gmail.com>",
      subject,
      html: body,
    });
  }
}
