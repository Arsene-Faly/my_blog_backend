"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password, saltRounds = 10) => await bcrypt_1.default.hash(password, saltRounds);
exports.hashPassword = hashPassword;
const comparePassword = async (password, hash) => await bcrypt_1.default.compare(password, hash);
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcript.js.map