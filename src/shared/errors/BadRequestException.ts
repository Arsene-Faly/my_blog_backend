import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";
import { AppError } from "@/shared/errors/AppError";

export class BadRequestException extends AppError {
  constructor(
    message: string = "Bad request",
    errorCode: ErrorCodeType = ErrorCode.VALIDATION_ERROR,
    errors: Record<string, string> = {}
  ) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode, errors);
  }
}