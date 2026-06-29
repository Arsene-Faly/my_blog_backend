"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_config_1 = require("../../config/http.config");
const asyncHandler_middleware_1 = require("../../shared/middlewares/asyncHandler.middleware");
const auth_validator_1 = require("../../modules/auth/auth.validator");
const cookie_1 = require("../../shared/utils/cookie");
// import { UnauthorizedException } from "../../shared/errors/UnauthorizedException";
const success_code_1 = require("../../shared/constants/success-code");
const app_config_1 = require("../../config/app.config");
class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const body = auth_validator_1.registerValidator.parse({
            ...req.body,
        });
        const { user } = await this.authService.register(body);
        return res.status(http_config_1.HTTPSTATUS.CREATED).json({
            message: "User created successfully",
            successCode: success_code_1.SuccessCode.USER_CREATED,
            data: user,
        });
    });
    login = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const body = auth_validator_1.loginValidator.parse({
            ...req.body,
            userAgent: req.headers["user-agent"],
        });
        console.log(body);
        const { user, accessToken, refreshToken, mfaRequired } = await this.authService.login(body);
        return (0, cookie_1.setAuthenticationCookie)({
            res,
            refreshToken,
        }).status(http_config_1.HTTPSTATUS.OK).json({
            message: "User connected successfull!!",
            user,
            accessToken,
            mfaRequired,
        });
    });
    refresh = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(http_config_1.HTTPSTATUS.UNAUTHORIZED).json({
                message: "Refresh token not found",
            });
        }
        const { user, accessToken } = await this.authService.refresh(refreshToken);
        return res.status(http_config_1.HTTPSTATUS.OK).json({
            message: "Refresh token successfully",
            user,
            accessToken
        });
    });
    resendVerifyEmail = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const { email } = auth_validator_1.resendVerifyEmailValidator.parse(req.body);
        console.log('Data receive:', email);
        await this.authService.resendVerifyEmail(email);
        return res.status(200).json({
            message: "Email resend successfully blabla",
        });
    });
    verifyEmail = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const { code } = auth_validator_1.verificationEmailValidator.parse(req.params);
        const { expired } = await this.authService.verifyEmail(code);
        if (expired) {
            return res.redirect(`${app_config_1.config.FRONTEND_ORIGIN}/expired-email`);
        }
        return res.redirect(`${app_config_1.config.FRONTEND_ORIGIN}/login?verified=true`);
    });
    sendEmailPasswordReset = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const { email } = auth_validator_1.sendEmailPasswordResetValidator.parse(req.body);
        await this.authService.sendEmailPasswordReset(email);
        return res.status(200).json({
            message: "Réinitialisé le mot de passe",
        });
    });
    resetPassword = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const { code, password } = auth_validator_1.resetPasswordValidator.parse(req.body);
        const { user } = await this.authService.resetPassword(code, password);
        return res.status(200).json({
            message: "Votre mot de pass a été réinitialisé",
            user
        });
    });
    logout = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        console.log("Session ID", req.body.userId);
        const userId = req.body.userId; // vient du middleware auth
        const result = await this.authService.logout(userId);
        return res.status(200).json({
            success: true,
            ...result,
        });
    });
    logoutAll = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        console.log(req.body);
        const userId = req.userId; // vient du middleware auth
        const result = await this.authService.logoutAll(userId);
        return res.status(200).json({
            success: true,
            ...result,
        });
    });
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map