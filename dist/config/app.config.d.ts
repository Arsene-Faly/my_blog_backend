import { SignOptions } from "jsonwebtoken";
export declare const config: {
    NODE_ENV: string;
    PORT: string;
    FRONTEND_ORIGIN: string;
    BACKEND_ORIGIN: string;
    BASE_API: string;
    MONGODB_URI: string;
    JWT: {
        SECRET: string;
        EXPIRES_IN: SignOptions["expiresIn"];
        REFRESH_SECRET: string;
        REFRESH_EXPIRES_IN: SignOptions["expiresIn"];
    };
    MAILER_SENDER: string;
    RESEND_API_KEY: string;
    MAIL_USER: string;
    MAIL_PASSWORD: string;
};
//# sourceMappingURL=app.config.d.ts.map