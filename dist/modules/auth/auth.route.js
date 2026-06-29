"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_module_1 = require("../../modules/auth/auth.module");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/register", auth_module_1.authController.register);
authRoutes.post("/login", auth_module_1.authController.login);
authRoutes.post("/refresh", auth_module_1.authController.refresh);
authRoutes.post("/logout/:userId", auth_module_1.authController.logout);
authRoutes.post("/logout/all", auth_module_1.authController.logoutAll);
authRoutes.post("/resend/email", auth_module_1.authController.resendVerifyEmail);
authRoutes.get("/verify/email/:code", auth_module_1.authController.verifyEmail);
authRoutes.post("/send/email/reset-password", auth_module_1.authController.sendEmailPasswordReset);
authRoutes.post("/reset/password", auth_module_1.authController.resetPassword);
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map