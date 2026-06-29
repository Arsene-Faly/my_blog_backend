import { RoleTypes } from "../modules/users/models/user.model";
export interface AccessTokenPayload {
    userId: string;
    sessionId: string;
    role: RoleTypes;
}
export interface RefreshTokenPayload {
    sessionId: string;
}
export type JwtAudience = RoleTypes;
//# sourceMappingURL=jwt.types.d.ts.map