"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const http_config_1 = require("../../config/http.config");
const error_code_1 = require("../../shared/constants/error-code");
const AppError_1 = require("../../shared/errors/AppError");
const formatZodErrors = (error) => {
    const formatted = {};
    error.issues.forEach((err) => {
        const field = err.path.join(".");
        formatted[field] = err.message;
    });
    return formatted;
};
const errorHandler = (error, _req, res, _next) => {
    console.error("🔥 ERROR:", error);
    if (error instanceof zod_1.ZodError) {
        return res.status(http_config_1.HTTPSTATUS.BAD_REQUEST).json({
            success: false,
            message: "Validation error",
            errors: formatZodErrors(error),
            errorCode: error_code_1.ErrorCode.VALIDATION_ERROR,
        });
    }
    if (error instanceof AppError_1.AppError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            errors: error.errors,
            errorCode: error.errorCode,
        });
    }
    return res.status(http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        errors: {},
        errorCode: error_code_1.ErrorCode.INTERNAL_SERVER_ERROR,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map