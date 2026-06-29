import mongoose, { HydratedDocument } from "mongoose";
export declare const Roles: {
    readonly user: "user";
    readonly admin: "admin";
};
export type RoleTypes = (typeof Roles)[keyof typeof Roles];
export interface User {
    name: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    role: RoleTypes;
    lastLoginAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
export type UserDocument = HydratedDocument<User>;
declare const UserModel: mongoose.Model<mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, {}, mongoose.DefaultSchemaOptions> & mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
} & Required<{
    _id: mongoose.Types.ObjectId;
}>, any, mongoose.Document<unknown, {}, User, {}, mongoose.DefaultSchemaOptions> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}>;
export default UserModel;
//# sourceMappingURL=user.model.d.ts.map