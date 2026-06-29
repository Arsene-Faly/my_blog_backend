"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_time_1 = require("../../../shared/utils/date-time");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const passwordResetSchema = new mongoose_2.Schema({
    userId: {
        type: mongoose_2.Schema.Types.ObjectId,
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
        default: date_time_1.AfterResetPasswordExpirationDate
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
passwordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const PasswordResetModel = mongoose_1.default.model("PasswordReset", passwordResetSchema, "password_reset");
exports.default = PasswordResetModel;
//# sourceMappingURL=PasswordReset.model.js.map