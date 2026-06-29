"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../../modules/users/models/user.model"));
class UserService {
    async update(data) {
        const { userId, name, email } = data;
        await user_model_1.default.findByIdAndUpdate(userId, {
            name,
            email,
        });
        return { message: "User updated" };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map