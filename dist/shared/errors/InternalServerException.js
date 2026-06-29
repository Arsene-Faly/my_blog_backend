"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerException = void 0;
const http_config_1 = require("../../config/http.config");
const error_code_1 = require("../../shared/constants/error-code");
const AppError_1 = require("../../shared/errors/AppError");
class InternalServerException extends AppError_1.AppError {
    constructor(message = "Internal Server Error", errorCode = error_code_1.ErrorCode.INTERNAL_SERVER_ERROR) {
        super(message, http_config_1.HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
    }
}
exports.InternalServerException = InternalServerException;
// import { HTTPSTATUS } from "../../config/http.config";
// import { ErrorCode, ErrorCodeType } from "../../shared/constants/error-code";
// import { AppError } from "../../shared/errors/AppError";
// export class InternalServerException extends AppError {
//   constructor(
//     message: string = "Internal Server Error",
//     errorCode: ErrorCodeType = ErrorCode.INTERNAL_SERVER_ERROR
//   ) {
//     super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
//   }
// }
//# sourceMappingURL=InternalServerException.js.map