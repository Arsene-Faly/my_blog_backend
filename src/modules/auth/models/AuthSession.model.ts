
import { SessionExpirationDate } from "@/shared/utils/date-time";
import mongoose, { Schema, HydratedDocument, Types } from "mongoose";

export interface AuthSession {
  userId: Types.ObjectId;
  userAgent?: string;
  refreshTokenHash: string;
  expiresAt: Date;
  createdAt: Date;
  // ip?: string;
}

export type AuthSessionDocument = HydratedDocument<AuthSession>;

const authSessionSchema = new Schema<AuthSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    userAgent: { type: String },
    refreshTokenHash: { type: String, required: true , unique: true },
    expiresAt: { 
      type: Date, 
      required: true, 
      default: SessionExpirationDate,
    },
    createdAt: { type: Date, default: Date.now },
    // ip: { type: String },
  }
);

authSessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const AuthSessionModel = mongoose.model<AuthSessionDocument>(
  "AuthSession", 
  authSessionSchema,
  "auth_sessions"
);
export default AuthSessionModel;
