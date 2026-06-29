"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAuthenticationCookie = exports.getAccessTokenCookieOptions = exports.getRefreshTokenCookieOptions = exports.defaults = exports.REFRESH_PATH = void 0;
const app_config_1 = require("../../config/app.config");
const date_time_1 = require("./date-time");
exports.REFRESH_PATH = `${app_config_1.config.BASE_API}/auth/refresh`;
exports.defaults = {
    httpOnly: true,
    secure: app_config_1.config.NODE_ENV === "production" ? true : false,
    sameSite: app_config_1.config.NODE_ENV === "production" ? "strict" : "lax",
};
const getRefreshTokenCookieOptions = () => {
    const expiresIn = app_config_1.config.JWT.REFRESH_EXPIRES_IN;
    const expires = (0, date_time_1.calculateExpirationDate)(expiresIn);
    return {
        ...exports.defaults,
        expires,
        path: exports.REFRESH_PATH
    };
};
exports.getRefreshTokenCookieOptions = getRefreshTokenCookieOptions;
const getAccessTokenCookieOptions = () => {
    const expiresIn = app_config_1.config.JWT.EXPIRES_IN;
    const expires = (0, date_time_1.calculateExpirationDate)(expiresIn);
    return {
        ...exports.defaults,
        expires,
        path: "/",
    };
};
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
// export const setAuthenticationCookie = ({
//     res,
//     refreshToken,
// }: CookiePayloadType): Response => 
//      res
//         .cookie("refresh_token", refreshToken, getRefreshTokenCookieOptions());
//         // .cookie("access_token", accessToken, getAccessTokenCookieOptions())
const setAuthenticationCookie = ({ res, refreshToken, }) => {
    return res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: false, // dev
        sameSite: "lax",
        path: "/", // 🔥 IMPORTANT (PAS /refresh)
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 semaine
    });
};
exports.setAuthenticationCookie = setAuthenticationCookie;
//# sourceMappingURL=cookie.js.map