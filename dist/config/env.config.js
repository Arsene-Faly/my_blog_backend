"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (key, defaultValue) => {
    const value = process.env[key];
    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`❌ Environment variable ${key} is not defined in .env file`);
    }
    return value;
};
exports.getEnv = getEnv;
//# sourceMappingURL=env.config.js.map