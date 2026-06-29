"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resend = void 0;
const app_config_1 = require("../config/app.config");
const resend_1 = require("resend");
exports.resend = new resend_1.Resend(app_config_1.config.RESEND_API_KEY);
//# sourceMappingURL=resendClient.js.map