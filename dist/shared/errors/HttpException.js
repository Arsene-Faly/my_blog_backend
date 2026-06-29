"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const AppError_1 = require("../../shared/errors/AppError");
class HttpException extends AppError_1.AppError {
    constructor(message, statusCode, errorCode) {
        super(message, statusCode, errorCode);
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map