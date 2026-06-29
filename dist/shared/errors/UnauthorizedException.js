"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const http_config_1 = require("../../config/http.config");
const error_code_1 = require("../../shared/constants/error-code");
const AppError_1 = require("../../shared/errors/AppError");
class UnauthorizedException extends AppError_1.AppError {
    constructor(message = "Unauthorized access", errorCode = error_code_1.ErrorCode.ACCESS_UNAUTHORIZED, errors = {}) {
        super(message, http_config_1.HTTPSTATUS.UNAUTHORIZED, errorCode, errors);
    }
}
exports.UnauthorizedException = UnauthorizedException;
// import { HTTPSTATUS } from "../../config/http.config";
// import { AppError } from "../../shared/errors/AppError";
// import { ErrorCode, ErrorCodeType } from "../../shared/constants/error-code";
// export class UnauthorizedException extends AppError {
//   constructor(
//     message: string = "Unauthorized access",
//     errorCode: ErrorCodeType = ErrorCode.ACCESS_UNAUTHORIZED
//   ) {
//     super(message, HTTPSTATUS.UNAUTHORIZED, errorCode);
//   }
// }
//# sourceMappingURL=UnauthorizedException.js.map