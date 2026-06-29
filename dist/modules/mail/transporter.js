"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_config_1 = require("../../config/app.config");
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: app_config_1.config.MAIL_USER,
        pass: app_config_1.config.MAIL_PASSWORD
    },
});
//# sourceMappingURL=transporter.js.map