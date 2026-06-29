
import { HttpStatusCodeType } from "@/config/http.config";
import { ErrorCodeType } from "@/shared/constants/error-code";
import { AppError } from "@/shared/errors/AppError";

export class HttpException extends AppError {
    constructor(
        message: string, 
        statusCode: HttpStatusCodeType, 
        errorCode: ErrorCodeType
    ) {
       super(message, statusCode, errorCode);
    }
}