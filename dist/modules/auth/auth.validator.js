"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailPasswordResetValidator = exports.resetPasswordValidator = exports.resendVerifyEmailValidator = exports.verificationEmailValidator = exports.loginValidator = exports.registerValidator = exports.passwordValidator = exports.emailValidator = void 0;
const zod_1 = require("zod");
exports.emailValidator = zod_1.z.string().trim().email().max(50);
exports.passwordValidator = zod_1.z.string().trim().min(6).max(255);
exports.registerValidator = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(50),
    email: exports.emailValidator,
    password: zod_1.z.string().min(8),
    confirmPassword: zod_1.z.string().nonempty("Confirmation requise"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
exports.loginValidator = zod_1.z.object({
    email: exports.emailValidator,
    password: zod_1.z.string(),
    userAgent: zod_1.z.string().optional(),
});
exports.verificationEmailValidator = zod_1.z.object({
    code: zod_1.z.string().trim().min(2).max(255),
});
exports.resendVerifyEmailValidator = zod_1.z.object({
    email: exports.emailValidator,
});
exports.resetPasswordValidator = zod_1.z.object({
    code: zod_1.z.string().trim().min(2).max(255),
    password: zod_1.z.string().trim().min(6).max(255),
});
exports.sendEmailPasswordResetValidator = zod_1.z.object({
    email: exports.emailValidator,
});
//# sourceMappingURL=auth.validator.js.map