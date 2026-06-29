import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";
import { AppError, ErrorMap } from "@/shared/errors/AppError";

export class ValidationException extends AppError {
  constructor(
    errors: ErrorMap,
    message: string = "Validation error",
    errorCode: ErrorCodeType = ErrorCode.VALIDATION_ERROR
  ) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode, errors);
  }
}