import { AfterResetPasswordExpirationDate } from "@/shared/utils/date-time";
import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
import { Schema } from "mongoose";


export interface PasswordReset {
    userId: mongoose.Types.ObjectId;
    attempts: number;
    expiresAt: Date;
    createdAt: Date;
}

export type PasswordResetDocument = HydratedDocument<PasswordReset>;



const passwordResetSchema = new Schema<PasswordResetDocument>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true,
    },
    attempts: {
        type: Number,
        required: true,
        default: 1
    },
    expiresAt: {
        type: Date,
        required: true,
        default: AfterResetPasswordExpirationDate
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

passwordResetSchema.index(
    { expiresAt: 1},
    { expireAfterSeconds: 0}
);

const PasswordResetModel = mongoose.model<PasswordResetDocument>(
    "PasswordReset", 
    passwordResetSchema,
    "password_reset"
);

export default PasswordResetModel;