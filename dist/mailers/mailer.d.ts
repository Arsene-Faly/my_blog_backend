type Params = {
    to: string | string[];
    subject: string;
    html: string;
    text: string;
    from?: string;
};
export declare const sendEmail: ({ to, subject, html, text, from, }: Params) => Promise<import("resend").CreateEmailResponse>;
export {};
//# sourceMappingURL=mailer.d.ts.map