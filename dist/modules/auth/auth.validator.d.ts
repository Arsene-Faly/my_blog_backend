import { z } from "zod";
export declare const emailValidator: z.ZodString;
export declare const passwordValidator: z.ZodString;
export declare const registerValidator: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const loginValidator: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    userAgent: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const verificationEmailValidator: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
export declare const resendVerifyEmailValidator: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const resetPasswordValidator: z.ZodObject<{
    code: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const sendEmailPasswordResetValidator: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=auth.validator.d.ts.map