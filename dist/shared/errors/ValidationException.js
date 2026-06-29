"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const http_config_1 = require("../../config/http.config");
const error_code_1 = require("../../shared/constants/error-code");
const AppError_1 = require("../../shared/errors/AppError");
class ValidationException extends AppError_1.AppError {
    constructor(errors, message = "Validation error", errorCode = error_code_1.ErrorCode.VALIDATION_ERROR) {
        super(message, http_config_1.HTTPSTATUS.BAD_REQUEST, errorCode, errors);
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=ValidationException.js.map