"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// import { config } from "../config/app.config";
const resendClient_1 = require("./resendClient");
// Correction du format de l'expéditeur
// const mailer_sender = 
//     config.NODE_ENV === "development" 
//         ? "onboarding@resend.dev"  // Pas de "no-reply <...>" en développement
//         : config.MAILER_SENDER;     // Assurez-vous que config.MAILER_SENDER est juste l'email
const sendEmail = async ({ to, subject, html, text, from = "delivered@resend.dev", }) => {
    return await resendClient_1.resend.emails.send({
        from, // Utilisez directement la variable from
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text
    });
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map