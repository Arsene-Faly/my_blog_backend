import { LoginDTO, RegisterDTO } from "@/modules/auth/auth.dto";
import UserModel from "@/modules/users/models/user.model";
import { ErrorCode } from "@/shared/constants/error-code";
// import { BadRequestException } from "@/shared/errors/BadRequestException";
import { Verification } from "@/modules/auth/constants/verification.enum";
import { AfterResetPasswordExpirationDate, EmailVerificationExpirationDate, getRemainingTime, ResetPasswordExpirationDate, SessionExpirationDate } from "@/shared/utils/date-time";
import AuthVerificationModel from "@/modules/auth/models/AuthVerification.model";
import { JwtUtils } from "@/shared/utils/jwt";
import { UnauthorizedException } from "@/shared/errors/UnauthorizedException";
import { RefreshTokenPayload } from "@/types/jwt.types";
import { comparePassword, hashPassword } from "@/shared/utils/bcript";
import { Types } from "mongoose";
import { NotFoundException } from "@/shared/errors/NotFoundException";
import AuthSessionModel from "./models/AuthSession.model";
import { ValidationException } from "@/shared/errors/ValidationException";
import { EmailService } from "../mail/email.service";
import PasswordResetModel from "./models/PasswordReset.model";
import { generateUniqueCode } from "@/shared/utils/uuid";

export class AuthService {

    public async register(registerData: RegisterDTO) {
        const { name, email, password } = registerData;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            throw new ValidationException({
                email: "email already exist",
                errorCode: ErrorCode.AUTH_EMAIL_ALREADY_EXIST,
            }, "L'addresse email est déjà utilisée");
        }

        const existingName = await UserModel.findOne({ name });
        const generateName = `${name}-${Math.ceil(Math.random() * 10000)}`;

        const newUser =  await UserModel.create({
            name: existingName?.name ? `${generateName}` : name,
            email,
            password,
        });

        const userId = newUser._id;

        const verificationCode = await AuthVerificationModel.create({
            userId,
            type: Verification.EMAIL_VERIFICATION,
            expiresAt: EmailVerificationExpirationDate()
        });

        await EmailService.sendVerificationEmail(
            newUser.email,
            newUser.name,
            verificationCode.code
        );

        return {
            user: newUser,
        }
        
    }

    public async login(loginData: LoginDTO) {
            const { email, password, userAgent } = loginData;

            const user = await UserModel.findOne({ email }).select("+password");
            if (!user) {
                throw new ValidationException({
                    email: "Invalid email or password",
                    errorCode: ErrorCode.AUTH_USER_NOT_FOUND,
                },"identifiants invalides");
            }

            const isPasswordMatch = await user.comparePassword(password);
            if (!isPasswordMatch) {
                throw new ValidationException({
                    email: "Invalid email or password",
                    errorCode: ErrorCode.AUTH_USER_NOT_FOUND,
                }, "identifiants invalides");
            }

            const existingVerificationCode = await AuthVerificationModel.findOne({
                userId: user._id,
                type: Verification.EMAIL_VERIFICATION,
                expiresAt: { $gt: new Date() },
            });

            // Vérifie email
            if (!user.isEmailVerified && existingVerificationCode) {
                throw new ValidationException({
                    email: "Une code de verification a déjà été envoyé",
                    errorCode: ErrorCode.AUTH_USER_NOT_FOUND,
                }, "Une code de verification a déjà été envoyé a votre email!!");
            }

            if(!existingVerificationCode) {
                const newCode = await AuthVerificationModel.create({
                    userId: user._id,
                    type: Verification.EMAIL_VERIFICATION,
                    expiresAt: EmailVerificationExpirationDate()
                });

                await EmailService.sendVerificationEmail(
                    user.email,
                    user.name,
                    newCode.code
                );

                throw new ValidationException({
                    email: "Une nouvelle code de vérification a été envoyé à votre email",
                    errorCode: ErrorCode.AUTH_USER_NOT_FOUND,
                }, "Une nouvelle code de vérification a été envoyé à votre email");
            }



            // 1. Crée la session vide d'abord pour avoir l'_id
            const sessionData: { userId: Types.ObjectId; userAgent?: string } = {
                    userId: user._id,
            };

            if (userAgent) sessionData.userAgent = userAgent;

            const session = new AuthSessionModel(sessionData);

            // 2. Génère les tokens MAINTENANT
            const accessToken = JwtUtils.signAccessToken({
                userId: user._id.toString(),
                sessionId: session._id.toString(),
                role: user.role,
            });

            const refreshToken = JwtUtils.signRefreshToken({
                sessionId: session._id.toString()
            });

            // 3. Hash et save en 1 fois
            session.refreshTokenHash = await hashPassword(refreshToken);
            session.expiresAt = SessionExpirationDate(); // 7j
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

    public async verifyEmail(code: string) {
          
        let expired = false;
        const validateCode = await AuthVerificationModel.findOne({ 
            code, 
            type: Verification.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        });

        if (!validateCode) {
            expired = true;
           return {
               expired,
           }
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            validateCode.userId,
            { isEmailVerified: true },
            { new: true }
        );

        if (!updateUser) {
            throw new NotFoundException("Unable to verify address email");
        }

        return {
            user:  updateUser.toJSON(),
        }

    }

    public async resendVerifyEmail(email: string) {
        const emailExist = await UserModel.findOne({ email });

        if (!emailExist) {
            throw new ValidationException({
                email: "L'addresse email n'existe pas",
                errorCode: "EMAIL_NOT_EXIST",
            }, "Email non existant");
        }

        const existingVerificationCode = await AuthVerificationModel.findOne({
            userId: emailExist._id,
            type: Verification.EMAIL_VERIFICATION,
            expiresAt: { $gt: new Date() },
        });

        if (existingVerificationCode) {
            throw new ValidationException({
                email: "Une code de verification a déjà été envoyé",
                errorCode: ErrorCode.AUTH_USER_NOT_FOUND,
            }, "Une code de verification a déjà été envoyé a votre email!!");
        }

        const newCode = await AuthVerificationModel.create({
            userId: emailExist._id,
            type: Verification.EMAIL_VERIFICATION,
            expiresAt: EmailVerificationExpirationDate()
        });

        await EmailService.sendVerificationEmail(
            emailExist.email,
            emailExist.name,
            newCode.code
        );

        return {
            message: "Un email a été envoyé à l'adresse email",
        }
    }

    public async refresh(refreshToken: string) {
        // 1. Vérifie le JWT refresh
        let payload: RefreshTokenPayload;
        try {
            payload = JwtUtils.verifyRefreshToken(refreshToken);
        } catch {
            throw new UnauthorizedException("Invalid or expired refresh token");
        }

        // 2. Récupère la session
        const session = await AuthSessionModel.findById(payload.sessionId);
        if (!session) {
            console.log("Token tsy miexiste!!!!");
            throw new UnauthorizedException("Session not found");
        }

        // 3. Vérifie expiration
        if (session.expiresAt < new Date()) {
            await AuthSessionModel.deleteOne({ _id: session._id });
            throw new UnauthorizedException("Session expired");
        }

        // 4. Détection de réutilisation : compare hash
        const isValidRefresh = await comparePassword(refreshToken, session.refreshTokenHash);
        if (!isValidRefresh) {
            // Token volé ou réutilisé -> on kill toutes les sessions du user
            await AuthSessionModel.deleteMany({ userId: session.userId });
            throw new UnauthorizedException("Refresh token reuse detected. All sessions revoked");
        }

        // 5. Récupère le user
        const user = await UserModel.findById(session.userId);
        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        // 6. Génère nouveaux tokens = ROTATION
        const newAccessToken = JwtUtils.signAccessToken({
            userId: user._id.toString(),
            sessionId: session._id.toString(),
            role: user.role,
        });

        const newRefreshToken = JwtUtils.signRefreshToken({
            sessionId: session._id.toString(), // pas de role
        });

        // 7. Update le hash dans la session
        session.refreshTokenHash = await hashPassword(newRefreshToken);
        await session.save();

        // 8. Retourne seulement les tokens
        return {
            user,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    public async sendEmailPasswordReset(email: string) {
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) {
            throw new ValidationException({
                email: "L'adresse email n'existe pas",
                errorCode: "EMAIL_NOT_EXIST",
            }, "Email non existant");
        }

        let passwordReset = await PasswordResetModel.findOne({
            userId: existingUser._id,
        });

        if (passwordReset) {

            if (passwordReset.attempts >= 3) {
                throw new ValidationException({
                    email: `Vous avez atteint la limite de Lien de réinitialisation de mot de passe, ce processus ne marche qu'apres  ${getRemainingTime(passwordReset.expiresAt)}`,
                    errorCode: "PASSWORD_RESET_LIMIT",
                }, "Limite atteinte");
            }

            passwordReset.attempts += 1;
            passwordReset.expiresAt = AfterResetPasswordExpirationDate();

            await passwordReset.save();
        }

        if (!passwordReset) {
            passwordReset = await PasswordResetModel.create({
                userId: existingUser._id,
                attempts: 1,
                expiresAt: AfterResetPasswordExpirationDate(),
            });
        }

        const resetCode = await AuthVerificationModel.create({
            userId: existingUser._id,
            type: Verification.PASSWORD_RESET,
            code: generateUniqueCode(),
            expiresAt: ResetPasswordExpirationDate(),
        });

        await EmailService.sendPasswordResetEmail(
            existingUser.email,
            existingUser.name,
            resetCode.code
        );

        return {
            message: "Un email a été envoyé à l'adresse email",
        };
    }

    public async resetPassword(code: string, password: string) {
        const validateCode = await AuthVerificationModel.findOne({ 
            code, 
            type: Verification.PASSWORD_RESET,
            expiresAt: { $gt: new Date() },
        });

        if (!validateCode) {
            throw new ValidationException({
                code: "Le code est invalide ou expiré",
                errorCode: "INVALID_CODE",
            }, "Le code est invalide ou expiré");
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            validateCode.userId,
            { password: await hashPassword(password) },
            { new: true }
        );

        if (!updateUser) {
            throw new NotFoundException("Unable to reset password");
        }

        return {
            user:  updateUser.toJSON(),
        }
    }

    public async logout(userId: string) {
        
        if (!Types.ObjectId.isValid(userId)) {
            throw new ValidationException({
                id: "Invalid user ID",
                errorCode: "INVALID_USER_ID",
            },"L'ID n'est pas valide");
        }

        const result = await AuthSessionModel.deleteOne({ userId });
        if (result.deletedCount === 0) {
            throw new NotFoundException("Session not found");
        }

        return { message: "Logged out successfully" };

    }

    public async logoutAll(userId: string) {
        await AuthSessionModel.deleteMany({ userId });
        return { message: "All sessions revoked" };
    }

}