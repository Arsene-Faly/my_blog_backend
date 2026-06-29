"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = __importDefault(require("../../modules/users/models/user.model"));
const error_code_1 = require("../../shared/constants/error-code");
// import { BadRequestException } from "../../shared/errors/BadRequestException";
const verification_enum_1 = require("../../modules/auth/constants/verification.enum");
const date_time_1 = require("../../shared/utils/date-time");
const AuthVerification_model_1 = __importDefault(require("../../modules/auth/models/AuthVerification.model"));
const jwt_1 = require("../../shared/utils/jwt");
const UnauthorizedException_1 = require("../../shared/errors/UnauthorizedException");
const bcript_1 = require("../../shared/utils/bcript");
const mongoose_1 = require("mongoose");
const NotFoundException_1 = require("../../shared/errors/NotFoundException");
const AuthSession_model_1 = __importDefault(require("./models/AuthSession.model"));
const ValidationException_1 = require("../../shared/errors/ValidationException");
const email_service_1 = require("../mail/email.service");
const PasswordReset_model_1 = __importDefault(require("./models/PasswordReset.model"));
const uuid_1 = require("../../shared/utils/uuid");
class AuthService {
    async register(registerData) {
        const { name, email, password } = registerData;
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            throw new ValidationException_1.ValidationException({
                email: "email already exist",
                errorCode: error_code_1.ErrorCode.AUTH_EMAIL_ALREADY_EXIST,
            }, "L'addresse email est déjà utilisée");
        }
        const existingName = await user_model_1.default.findOne({ name });
        const generateName = `${name}-${Math.ceil(Math.random() * 10000)}`;
        const newUser = await user_model_1.default.create({
            name: existingName?.name ? `${generateName}` : name,
            email,
            password,
        });
        const userId = newUser._id;
        const verificationCode = await AuthVerification_model_1.default.create({
            userId,
            type: verification_enum_1.Verification.EMAIL_VERIFICATION,
            expiresAt: (0, date_time_1.EmailVerificationExpirationDate)()
        });
        await email_service_1.EmailService.sendVerificationEmail(newUser.email, newUser.name, verificationCode.code);
        return {
            user: newUser,
        };
    }
    async login(loginData) {
        const { email, password, userAgent } = loginData;
        const user = await user_model_1.default.findOne({ email }).select("+password");
        if (!user) {
            throw new ValidationException_1.ValidationException({
                email: "Invalid email or password",
                errorCode: error_code_1.ErrorCode.AUTH_USER_NOT_FOUND,
            }, "identifiants invalides");
        }
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            throw new ValidationException_1.ValidationException({
                email: "Invalid email or password",
                errorCode: error_code_1.ErrorCode.AUTH_USER_NOT_FOUND,
            }, "identifiants invalides");
        }
        const existingVerificationCode = await AuthVerification_model_1.default.findOne({
            userId: user._id,
            type: verification_enum_1.Verification.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        });
        // Vérifie email
        if (!user.isEmailVerified && existingVerificationCode) {
            throw new ValidationException_1.ValidationException({
                email: "Une code de verification a déjà été envoyé",
                errorCode: error_code_1.ErrorCode.AUTH_USER_NOT_FOUND,
            }, "Une code de verification a déjà été envoyé a votre email!!");
        }
        if (!existingVerificationCode) {
            const newCode = await AuthVerification_model_1.default.create({
                userId: user._id,
                type: verification_enum_1.Verification.EMAIL_VERIFICATION,
                expiresAt: (0, date_time_1.EmailVerificationExpirationDate)()
            });
            await email_service_1.EmailService.sendVerificationEmail(user.email, user.name, newCode.code);
            throw new ValidationException_1.ValidationException({
                email: "Une nouvelle code de vérification a été envoyé à votre email",
                errorCode: error_code_1.ErrorCode.AUTH_USER_NOT_FOUND,
            }, "Une nouvelle code de vérification a été envoyé à votre email");
        }
        // 1. Crée la session vide d'abord pour avoir l'_id
        const sessionData = {
            userId: user._id,
        };
        if (userAgent)
            sessionData.userAgent = userAgent;
        const session = new AuthSession_model_1.default(sessionData);
        // 2. Génère les tokens MAINTENANT
        const accessToken = jwt_1.JwtUtils.signAccessToken({
            userId: user._id.toString(),
            sessionId: session._id.toString(),
            role: user.role,
        });
        const refreshToken = jwt_1.JwtUtils.signRefreshToken({
            sessionId: session._id.toString()
        });
        // 3. Hash et save en 1 fois
        session.refreshTokenHash = await (0, bcript_1.hashPassword)(refreshToken);
        session.expiresAt = (0, date_time_1.SessionExpirationDate)(); // 7j
        await session.save();
        // 4. Update lastLoginAt
        user.lastLoginAt = new Date();
        await user.save();
        return {
            user: user.toJSON(),
            accessToken,
            refreshToken,
            mfaRequired: false,
        };
    }
    async verifyEmail(code) {
        let expired = false;
        const validateCode = await AuthVerification_model_1.default.findOne({
            code,
            type: verification_enum_1.Verification.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        });
        if (!validateCode) {
            expired = true;
            return {
                expired,
            };
        }
        const updateUser = await user_model_1.default.findByIdAndUpdate(validateCode.userId, { isEmailVerified: true }, { new: true });
        if (!updateUser) {
            throw new NotFoundException_1.NotFoundException("Unable to verify address email");
        }
        return {
            user: updateUser.toJSON(),
        };
    }
    async resendVerifyEmail(email) {
        const emailExist = await user_model_1.default.findOne({ email });
        if (!emailExist) {
            throw new ValidationException_1.ValidationException({
                email: "L'addresse email n'existe pas",
                errorCode: "EMAIL_NOT_EXIST",
            }, "Email non existant");
        }
        const existingVerificationCode = await AuthVerification_model_1.default.findOne({
            userId: emailExist._id,
            type: verification_enum_1.Verification.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        });
        if (existingVerificationCode) {
            throw new ValidationException_1.ValidationException({
                email: "Une code de verification a déjà été envoyé",
                errorCode: error_code_1.ErrorCode.AUTH_USER_NOT_FOUND,
            }, "Une code de verification a déjà été envoyé a votre email!!");
        }
        const newCode = await AuthVerification_model_1.default.create({
            userId: emailExist._id,
            type: verification_enum_1.Verification.EMAIL_VERIFICATION,
            expiresAt: (0, date_time_1.EmailVerificationExpirationDate)()
        });
        await email_service_1.EmailService.sendVerificationEmail(emailExist.email, emailExist.name, newCode.code);
        return {
            message: "Un email a été envoyé à l'adresse email",
        };
    }
    async refresh(refreshToken) {
        // 1. Vérifie le JWT refresh
        let payload;
        try {
            payload = jwt_1.JwtUtils.verifyRefreshToken(refreshToken);
        }
        catch {
            throw new UnauthorizedException_1.UnauthorizedException("Invalid or expired refresh token");
        }
        // 2. Récupère la session
        const session = await AuthSession_model_1.default.findById(payload.sessionId);
        if (!session) {
            console.log("Token tsy miexiste!!!!");
            throw new UnauthorizedException_1.UnauthorizedException("Session not found");
        }
        // 3. Vérifie expiration
        if (session.expiresAt < new Date()) {
            await AuthSession_model_1.default.deleteOne({ _id: session._id });
            throw new UnauthorizedException_1.UnauthorizedException("Session expired");
        }
        // 4. Détection de réutilisation : compare hash
        const isValidRefresh = await (0, bcript_1.comparePassword)(refreshToken, session.refreshTokenHash);
        if (!isValidRefresh) {
            // Token volé ou réutilisé -> on kill toutes les sessions du user
            await AuthSession_model_1.default.deleteMany({ userId: session.userId });
            throw new UnauthorizedException_1.UnauthorizedException("Refresh token reuse detected. All sessions revoked");
        }
        // 5. Récupère le user
        const user = await user_model_1.default.findById(session.userId);
        if (!user) {
            throw new UnauthorizedException_1.UnauthorizedException("User not found");
        }
        // 6. Génère nouveaux tokens = ROTATION
        const newAccessToken = jwt_1.JwtUtils.signAccessToken({
            userId: user._id.toString(),
            sessionId: session._id.toString(),
            role: user.role,
        });
        const newRefreshToken = jwt_1.JwtUtils.signRefreshToken({
            sessionId: session._id.toString(), // pas de role
        });
        // 7. Update le hash dans la session
        session.refreshTokenHash = await (0, bcript_1.hashPassword)(newRefreshToken);
        await session.save();
        // 8. Retourne seulement les tokens
        return {
            user,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }
    async sendEmailPasswordReset(email) {
        const existingUser = await user_model_1.default.findOne({ email });
        if (!existingUser) {
            throw new ValidationException_1.ValidationException({
                email: "L'adresse email n'existe pas",
                errorCode: "EMAIL_NOT_EXIST",
            }, "Email non existant");
        }
        let passwordReset = await PasswordReset_model_1.default.findOne({
            userId: existingUser._id,
        });
        if (passwordReset) {
            if (passwordReset.attempts >= 3) {
                throw new ValidationException_1.ValidationException({
                    email: `Vous avez atteint la limite de Lien de réinitialisation de mot de passe, ce processus ne marche qu'apres  ${(0, date_time_1.getRemainingTime)(passwordReset.expiresAt)}`,
                    errorCode: "PASSWORD_RESET_LIMIT",
                }, "Limite atteinte");
            }
            passwordReset.attempts += 1;
            passwordReset.expiresAt = (0, date_time_1.AfterResetPasswordExpirationDate)();
            await passwordReset.save();
        }
        if (!passwordReset) {
            passwordReset = await PasswordReset_model_1.default.create({
                userId: existingUser._id,
                attempts: 1,
                expiresAt: (0, date_time_1.AfterResetPasswordExpirationDate)(),
            });
        }
        const resetCode = await AuthVerification_model_1.default.create({
            userId: existingUser._id,
            type: verification_enum_1.Verification.PASSWORD_RESET,
            code: (0, uuid_1.generateUniqueCode)(),
            expiresAt: (0, date_time_1.ResetPasswordExpirationDate)(),
        });
        await email_service_1.EmailService.sendPasswordResetEmail(existingUser.email, existingUser.name, resetCode.code);
        return {
            message: "Un email a été envoyé à l'adresse email",
        };
    }
    async resetPassword(code, password) {
        const validateCode = await AuthVerification_model_1.default.findOne({
            code,
            type: verification_enum_1.Verification.PASSWORD_RESET,
            expiresAt: { $gt: new Date() },
        });
        if (!validateCode) {
            throw new ValidationException_1.ValidationException({
                code: "Le code est invalide ou expiré",
                errorCode: "INVALID_CODE",
            }, "Le code est invalide ou expiré");
        }
        const updateUser = await user_model_1.default.findByIdAndUpdate(validateCode.userId, { password: await (0, bcript_1.hashPassword)(password) }, { new: true });
        if (!updateUser) {
            throw new NotFoundException_1.NotFoundException("Unable to reset password");
        }
        return {
            user: updateUser.toJSON(),
        };
    }
    async logout(userId) {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new ValidationException_1.ValidationException({
                id: "Invalid user ID",
                errorCode: "INVALID_USER_ID",
            }, "L'ID n'est pas valide");
        }
        const result = await AuthSession_model_1.default.deleteOne({ userId });
        if (result.deletedCount === 0) {
            throw new NotFoundException_1.NotFoundException("Session not found");
        }
        return { message: "Logged out successfully" };
    }
    async logoutAll(userId) {
        await AuthSession_model_1.default.deleteMany({ userId });
        return { message: "All sessions revoked" };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map