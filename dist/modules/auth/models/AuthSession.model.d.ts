import mongoose, { HydratedDocument, Types } from "mongoose";
export interface AuthSession {
    userId: Types.ObjectId;
    userAgent?: string;
    refreshTokenHash: string;
    expiresAt: Date;
    createdAt: Date;
}
export type AuthSessionDocument = HydratedDocument<AuthSession>;
declare const AuthSessionModel: mongoose.Model<mongoose.Document<unknown, {}, AuthSession, {}, mongoose.DefaultSchemaOptions> & AuthSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, AuthSession, {}, mongoose.DefaultSchemaOptions> & AuthSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, mongoose.DefaultSchemaOptions> & mongoose.Document<unknown, {}, AuthSession, {}, mongoose.DefaultSchemaOptions> & AuthSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
} & Required<{
    _id: Types.ObjectId;
}>, any, mongoose.Document<unknown, {}, AuthSession, {}, mongoose.DefaultSchemaOptions> & AuthSession & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export default AuthSessionModel;
//# sourceMappingURL=AuthSession.model.d.ts.map