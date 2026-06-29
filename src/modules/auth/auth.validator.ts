import { z } from "zod";

export const emailValidator = z.string().trim().email().max(50);
export const passwordValidator = z.string().trim().min(6).max(255);

export const registerValidator = z.object({
    name: z.string().trim().min(2).max(50),
    email: emailValidator,
    password: z.string().min(8),
    confirmPassword: z.string().nonempty("Confirmation requise"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export const loginValidator = z.object({
    email: emailValidator,
    password: z.string(),
    userAgent: z.string().optional(),
});

export const verificationEmailValidator = z.object({
    code: z.string().trim().min(2).max(255),
});

export const resendVerifyEmailValidator = z.object({
    email: emailValidator,
});

export const resetPasswordValidator = z.object({
    code: z.string().trim().min(2).max(255),
    password: z.string().trim().min(6).max(255),
});

export const sendEmailPasswordResetValidator = z.object({
    email: emailValidator,
});

