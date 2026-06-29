"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_config_1 = require("../../config/http.config");
const error_code_1 = require("../../shared/constants/error-code");
const AppError_1 = require("../../shared/errors/AppError");
class BadRequestException extends AppError_1.AppError {
    constructor(message = "Bad request", errorCode = error_code_1.ErrorCode.VALIDATION_ERROR, errors = {}) {
        super(message, http_config_1.HTTPSTATUS.BAD_REQUEST, errorCode, errors);
    }
}
exports.BadRequestException = BadRequestException;
//# sourceMappingURL=BadRequestException.js.map