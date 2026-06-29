"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../../shared/utils/jwt");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Le token est invalide ou access non autorisé",
            errorCode: "AUTH_INVALID_TOKEN",
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt_1.JwtUtils.verifyAccessToken(token);
        req.user = {
            userId: payload.userId,
            role: payload.role,
            sessionId: payload.sessionId,
        };
        return next();
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid token",
            errorCode: "AUTH_INVALID_TOKEN"
        });
    }
}
//# sourceMappingURL=auth.middleware.js.map