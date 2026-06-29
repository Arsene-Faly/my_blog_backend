// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import { JwtUtils } from '@/shared/utils/jwt';

// interface User {
//   userId: string;
//   role: string;
//   sessionId: string;
// }

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}



export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Le token est invalide ou access non autorisé",
      errorCode: "AUTH_INVALID_TOKEN",
    });
  }

  const token = authHeader.split(" ")[1];

  try {

    const payload = JwtUtils.verifyAccessToken(token as string);

    req.user = {
      userId: payload.userId,
      role: payload.role,
      sessionId: payload.sessionId,
    };

    return next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token",
      errorCode: "AUTH_INVALID_TOKEN"
    });

  }
}