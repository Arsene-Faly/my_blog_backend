import mongoose, { HydratedDocument } from "mongoose";
import { VerificationType } from "../../../modules/auth/constants/verification.enum";
export interface AuthVerification {
    userId: mongoose.Types.ObjectId;
    code: string;
    type: VerificationType;
    expiresAt: Date;
    createdAt: Date;
}
export type AuthVerificationDocument = HydratedDocument<AuthVerification>;
declare const AuthVerificationModel: mongoose.Model<mongoose.Document<unknown, {}, AuthVerification, {}, mongoose.DefaultSchemaOptions> & AuthVerification & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, AuthVerification, {}, mongoose.DefaultSchemaOptions> & AuthVerification & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, mongoose.DefaultSchemaOptions> & mongoose.Document<unknown, {}, AuthVerification, {}, mongoose.DefaultSchemaOptions> & AuthVerification & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
} & Required<{
    _id: mongoose.Types.ObjectId;
}>, any, mongoose.Document<unknown, {}, AuthVerification, {}, mongoose.DefaultSchemaOptions> & AuthVerification & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export default AuthVerificationModel;
//# sourceMappingURL=AuthVerification.model.d.ts.map