import { config } from "@/config/app.config";
import { verifyEmailTemplate } from "@/modules/mail/template/verifyEmailTemplate";
import { transporter } from "@/modules/mail/transporter";
import { sendPasswordResetEmailTemplate } from "./template/sendPasswordResetEmailTemplate";

export class EmailService {
  static async sendVerificationEmail(
    email: string,
    username: string,
    code: string
  ) {

    const verificationUrl = `${config.BACKEND_ORIGIN}/api/v1/auth/verify/email/${code}`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,

      to: email,

      subject: "Vérification de votre compte",

      html: verifyEmailTemplate(
        username,
        verificationUrl
      ),
    });
  }

  static async sendPasswordResetEmail(
    email: string,
    username: string,
    code: string
  ) {
    const passwordResetUrl = `${config.FRONTEND_ORIGIN}/reset/password/${code}`;

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      html: sendPasswordResetEmailTemplate(
        username,
        passwordResetUrl
      )
    });
  }
}