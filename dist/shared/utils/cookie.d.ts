import { CookieOptions, Response } from "express";
export declare const REFRESH_PATH: string;
export type CookiePayloadType = {
    res: Response;
    refreshToken: string;
};
export declare const defaults: CookieOptions;
export declare const getRefreshTokenCookieOptions: () => CookieOptions;
export declare const getAccessTokenCookieOptions: () => CookieOptions;
export declare const setAuthenticationCookie: ({ res, refreshToken, }: CookiePayloadType) => Response;
//# sourceMappingURL=cookie.d.ts.map