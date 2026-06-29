// import { config } from "@/config/app.config";
import { resend } from "./resendClient";

type Params = {
    to: string | string[];
    subject: string;
    html: string;
    text: string;
    from?: string;
}

// Correction du format de l'expéditeur
// const mailer_sender = 
//     config.NODE_ENV === "development" 
//         ? "onboarding@resend.dev"  // Pas de "no-reply <...>" en développement
//         : config.MAILER_SENDER;     // Assurez-vous que config.MAILER_SENDER est juste l'email

export const sendEmail = async ({
    to,
    subject,
    html,
    text,
    from = "delivered@resend.dev",
}: Params) => {
    return await resend.emails.send({
        from, // Utilisez directement la variable from
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text
    });
};