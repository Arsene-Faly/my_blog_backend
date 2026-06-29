import { RoleTypes } from "@/modules/users/models/user.model";

export interface AccessTokenPayload {
  userId: string;
  sessionId: string;
  role: RoleTypes;
}

export interface RefreshTokenPayload {
  sessionId: string; // pas de role ici
}

export type JwtAudience = RoleTypes;