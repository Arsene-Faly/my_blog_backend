import { HTTPSTATUS } from "@/config/http.config";
import { AuthService } from "@/modules/auth/auth.service";
import { asyncHandler } from "@/shared/middlewares/asyncHandler.middleware";
import { Request, Response } from "express";
import { loginValidator, registerValidator, resendVerifyEmailValidator, resetPasswordValidator, sendEmailPasswordResetValidator, verificationEmailValidator } from "@/modules/auth/auth.validator";
import { setAuthenticationCookie } from "@/shared/utils/cookie";
// import { UnauthorizedException } from "@/shared/errors/UnauthorizedException";
import { SuccessCode } from "@/shared/constants/success-code";
import { config } from "@/config/app.config";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      sessionId?: string;
      userRole?: "user" | "admin";
    }
  }
}

export class AuthController {
    private authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public register = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const body = registerValidator.parse({
                ...req.body,
            });

            const { user } = await this.authService.register(body);
              
            return res.status(HTTPSTATUS.CREATED).json({
                message: "User created successfully",
                successCode: SuccessCode.USER_CREATED,
                data: user,
            });
        }
    )

    public login = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const body = loginValidator.parse({
                ...req.body,
                userAgent: req.headers["user-agent"],
            });

            console.log(body);

            const { user, accessToken, refreshToken, mfaRequired } = await this.authService.login(body);

            return setAuthenticationCookie({
                res,
                refreshToken,
            }).status(HTTPSTATUS.OK).json({
                message: "User connected successfull!!",
                user,
                accessToken,
                mfaRequired,
            });
        }
    );

    public refresh = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const refreshToken = req.cookies.refresh_token as string | undefined;

            if(!refreshToken) {
               return res.status(HTTPSTATUS.UNAUTHORIZED).json({
                   message: "Refresh token not found",
               });
            }
            const { user, accessToken } = await this.authService.refresh(refreshToken);

            return res.status(HTTPSTATUS.OK).json({
                message: "Refresh token successfully",
                user,
                accessToken
            });
        }
    );

    public resendVerifyEmail = asyncHandler(
         async (req: Request, res: Response): Promise<any> => {
            const { email } = resendVerifyEmailValidator.parse(req.body);

            console.log('Data receive:',email);

            await this.authService.resendVerifyEmail(email);

            return res.status(200).json({
                message: "Email resend successfully blabla",
            });
         }
    );

    public verifyEmail = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
             const { code } = verificationEmailValidator.parse(req.params);
             const { expired } = await this.authService.verifyEmail(code);

             if(expired) {
                 return res.redirect(`${config.FRONTEND_ORIGIN}/expired-email`);
             }

            return res.redirect(`${config.FRONTEND_ORIGIN}/login?verified=true`);
        }
    );

    public sendEmailPasswordReset = asyncHandler(
        async (req: Request, res: Response): Promise<any> => {
            const { email } = sendEmailPasswordResetValidator.parse(req.body);

            await this.authService.sendEmailPasswordReset(email);

            return res.status(200).json({
                message: "Réinitialisé le mot de passe",
            });
        }
    );

    public resetPassword = asyncHandler(
        async(req: Request, res: Response): Promise<any> => {

            const { code, password } = resetPasswordValidator.parse(req.body);
            const { user } = await this.authService.resetPassword(code, password);
             
            return res.status(200).json({
                message: "Votre mot de pass a été réinitialisé",
                user
            });
        }
    );

    public logout = asyncHandler(async (req: Request, res: Response) => {
        console.log("Session ID",req.body.userId);
        const userId = req.body.userId; // vient du middleware auth
        const result = await this.authService.logout(userId as string);
        
        return res.status(200).json({
            success: true,
            ...result,
        });
    });

    public logoutAll = asyncHandler(async (req: Request, res: Response) => {

        console.log(req.body)
        const userId = req.userId; // vient du middleware auth
        const result = await this.authService.logoutAll(userId as string);
        
        return res.status(200).json({
            success: true,
            ...result,
        });
    });



}