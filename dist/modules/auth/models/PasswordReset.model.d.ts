import mongoose from "mongoose";
import { HydratedDocument } from "mongoose";
export interface PasswordReset {
    userId: mongoose.Types.ObjectId;
    attempts: number;
    expiresAt: Date;
    createdAt: Date;
}
export type PasswordResetDocument = HydratedDocument<PasswordReset>;
declare const PasswordResetModel: mongoose.Model<mongoose.Document<unknown, {}, PasswordReset, {}, mongoose.DefaultSchemaOptions> & PasswordReset & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, PasswordReset, {}, mongoose.DefaultSchemaOptions> & PasswordReset & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, mongoose.DefaultSchemaOptions> & mongoose.Document<unknown, {}, PasswordReset, {}, mongoose.DefaultSchemaOptions> & PasswordReset & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
} & Required<{
    _id: mongoose.Types.ObjectId;
}>, any, mongoose.Document<unknown, {}, PasswordReset, {}, mongoose.DefaultSchemaOptions> & PasswordReset & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export default PasswordResetModel;
//# sourceMappingURL=PasswordReset.model.d.ts.map