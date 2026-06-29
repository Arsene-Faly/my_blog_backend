"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const env_config_1 = require("../config/env.config");
exports.config = {
    NODE_ENV: (0, env_config_1.getEnv)("NODE_ENV"),
    PORT: (0, env_config_1.getEnv)("PORT"),
    FRONTEND_ORIGIN: (0, env_config_1.getEnv)("FRONTEND_ORIGIN"),
    BACKEND_ORIGIN: (0, env_config_1.getEnv)("BACKEND_ORIGIN"),
    BASE_API: (0, env_config_1.getEnv)("BASE_API", '/api/v1'),
    MONGODB_URI: (0, env_config_1.getEnv)("MONGODB_URI"),
    JWT: {
        SECRET: (0, env_config_1.getEnv)("JWT_SECRET"),
        EXPIRES_IN: (0, env_config_1.getEnv)("JWT_EXPIRES_IN"),
        REFRESH_SECRET: (0, env_config_1.getEnv)("JWT_REFRESH_SECRET"),
        REFRESH_EXPIRES_IN: (0, env_config_1.getEnv)("JWT_REFRESH_EXPIRES_IN"),
    },
    MAILER_SENDER: (0, env_config_1.getEnv)("MAILER_SENDER"),
    RESEND_API_KEY: (0, env_config_1.getEnv)("RESEND_API_KEY"),
    MAIL_USER: (0, env_config_1.getEnv)("MAIL_USER"),
    MAIL_PASSWORD: (0, env_config_1.getEnv)("MAIL_PASSWORD"),
};
//# sourceMappingURL=app.config.js.map