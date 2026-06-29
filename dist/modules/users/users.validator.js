"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.updateUserValidator = zod_1.default.object({
    userId: zod_1.default.string(),
    name: zod_1.default.string()
        .nonempty("Le nom est requis")
        .trim()
        .min(2)
        .max(255),
    email: zod_1.default.string()
        .nonempty("L'email est requis")
        .trim()
        .email("L'email n'est pas valide")
        .max(255),
});
//# sourceMappingURL=users.validator.js.map