import { AuthService } from "../../modules/auth/auth.service";
import { Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            userId?: string;
            sessionId?: string;
            userRole?: "user" | "admin";
        }
    }
}
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    login: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    refresh: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    resendVerifyEmail: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    verifyEmail: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    sendEmailPasswordReset: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    resetPassword: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    logout: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
    logoutAll: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
}
//# sourceMappingURL=auth.controller.d.ts.map