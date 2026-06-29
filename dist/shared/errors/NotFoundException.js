"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_config_1 = require("../../config/http.config");
const error_code_1 = require("../../shared/constants/error-code");
const AppError_1 = require("../../shared/errors/AppError");
class NotFoundException extends AppError_1.AppError {
    constructor(message = "Resource not found", errorCode = error_code_1.ErrorCode.RESOURCE_NOT_FOUND) {
        super(message, http_config_1.HTTPSTATUS.NOT_FOUND, errorCode);
    }
}
exports.NotFoundException = NotFoundException;
// import { HTTPSTATUS } from "../../config/http.config";
// import { AppError } from "../../shared/errors/AppError";
// import { ErrorCode, ErrorCodeType } from "../../shared/constants/error-code";
// export class NotFoundException extends AppError {
//   constructor(
//     message: string = "Resource not found",
//     errorCode: ErrorCodeType = ErrorCode.RESOURCE_NOT_FOUND
//   ) {
//     super(message, HTTPSTATUS.NOT_FOUND, errorCode);
//   }
// }
//# sourceMappingURL=NotFoundException.js.map