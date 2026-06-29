"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtUtils = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../config/app.config");
class JwtUtils {
    static signAccessToken(payload) {
        const options = {
            audience: "user",
        };
        if (app_config_1.config.JWT.EXPIRES_IN) {
            options.expiresIn = app_config_1.config.JWT.EXPIRES_IN;
        }
        return jsonwebtoken_1.default.sign(payload, app_config_1.config.JWT.SECRET, options);
    }
    static signRefreshToken(payload) {
        const options = {
            audience: "user",
        };
        if (app_config_1.config.JWT.REFRESH_EXPIRES_IN) {
            options.expiresIn = app_config_1.config.JWT.REFRESH_EXPIRES_IN;
        }
        return jsonwebtoken_1.default.sign(payload, app_config_1.config.JWT.REFRESH_SECRET, options);
    }
    static verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, app_config_1.config.JWT.SECRET);
    }
    static verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, app_config_1.config.JWT.REFRESH_SECRET);
    }
}
exports.JwtUtils = JwtUtils;
//# sourceMappingURL=jwt.js.map