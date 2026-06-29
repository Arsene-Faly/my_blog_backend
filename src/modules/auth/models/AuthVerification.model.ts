import mongoose, { HydratedDocument, Schema } from "mongoose";
import { Verification, VerificationType } from "@/modules/auth/constants/verification.enum";
import { generateUniqueCode } from "@/shared/utils/uuid";
import { EmailVerificationExpirationDate } from "@/shared/utils/date-time";

export interface AuthVerification {
    userId: mongoose.Types.ObjectId;
    code: string;
    type: VerificationType;
    expiresAt: Date;
    createdAt: Date;
}

export type AuthVerificationDocument = HydratedDocument<AuthVerification>;

const authVerificationSchema = new Schema<AuthVerificationDocument>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
        default: generateUniqueCode,
    },
    type: {
        type: String,
        required: true,
        enum: Verification
    },
    expiresAt: {
       type: Date,
       required: true,
       default: EmailVerificationExpirationDate
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

authVerificationSchema.index(
    { expiresAt: 1 },
    { expireAfterSeconds: 0 }
);

const AuthVerificationModel = mongoose.model<AuthVerificationDocument>(
    "AuthVerification", 
    authVerificationSchema,
    "auth_verification"
);

export default AuthVerificationModel;