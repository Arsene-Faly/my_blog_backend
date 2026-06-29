import { LoginDTO, RegisterDTO } from "../../modules/auth/auth.dto";
import { Types } from "mongoose";
export declare class AuthService {
    register(registerData: RegisterDTO): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    login(loginData: LoginDTO): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
        mfaRequired: boolean;
    }>;
    verifyEmail(code: string): Promise<{
        expired: boolean;
        user?: never;
    } | {
        user: import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
        expired?: never;
    }>;
    resendVerifyEmail(email: string): Promise<{
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
        accessToken: string;
        refreshToken: string;
    }>;
    sendEmailPasswordReset(email: string): Promise<{
        message: string;
    }>;
    resetPassword(code: string, password: string): Promise<{
        user: import("mongoose").Document<unknown, {}, import("../../modules/users/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../modules/users/models/user.model").User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    logoutAll(userId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map