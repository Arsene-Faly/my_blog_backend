import { AccessTokenPayload, RefreshTokenPayload } from "../../types/jwt.types";
export declare class JwtUtils {
    static signAccessToken(payload: AccessTokenPayload): string;
    static signRefreshToken(payload: RefreshTokenPayload): string;
    static verifyAccessToken(token: string): AccessTokenPayload;
    static verifyRefreshToken(token: string): RefreshTokenPayload;
}
//# sourceMappingURL=jwt.d.ts.map