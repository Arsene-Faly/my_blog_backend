"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const app_config_1 = require("../../config/app.config");
const verifyEmailTemplate_1 = require("../../modules/mail/template/verifyEmailTemplate");
const transporter_1 = require("../../modules/mail/transporter");
const sendPasswordResetEmailTemplate_1 = require("./template/sendPasswordResetEmailTemplate");
class EmailService {
    static async sendVerificationEmail(email, username, code) {
        const verificationUrl = `${app_config_1.config.BACKEND_ORIGIN}/api/v1/auth/verify/email/${code}`;
        await transporter_1.transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Vérification de votre compte",
            html: (0, verifyEmailTemplate_1.verifyEmailTemplate)(username, verificationUrl),
        });
    }
    static async sendPasswordResetEmail(email, username, code) {
        const passwordResetUrl = `${app_config_1.config.FRONTEND_ORIGIN}/reset/password/${code}`;
        await transporter_1.transporter.sendMail({
            from: process.env.MAIL_USER,
            to: email,
            subject: "Réinitialisation de votre mot de passe",
            html: (0, sendPasswordResetEmailTemplate_1.sendPasswordResetEmailTemplate)(username, passwordResetUrl)
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map