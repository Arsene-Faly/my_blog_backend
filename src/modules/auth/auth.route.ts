import { Router } from "express";
import { authController } from "@/modules/auth/auth.module";

const authRoutes = Router();

authRoutes.post("/register", authController.register);
authRoutes.post("/login", authController.login);
authRoutes.post("/refresh", authController.refresh);
authRoutes.post("/logout/:userId", authController.logout);
authRoutes.post("/logout/all", authController.logoutAll);


authRoutes.post("/resend/email", authController.resendVerifyEmail);
authRoutes.get("/verify/email/:code", authController.verifyEmail);
authRoutes.post("/send/email/reset-password", authController.sendEmailPasswordReset);
authRoutes.post("/reset/password", authController.resetPassword);

export default authRoutes;