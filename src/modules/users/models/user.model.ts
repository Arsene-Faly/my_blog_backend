import mongoose, { Schema, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";
import { hashPassword } from "@/shared/utils/bcript";

export const Roles = {
    user: "user",
    admin: "admin",
} as const;

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

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    role: { type: String, enum: Roles, default: Roles.user },
    lastLoginAt: { type: Date , default: null },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(_next) {
    if(this.isModified("password")) {
        this.password = await hashPassword(this.password);
    }
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;






