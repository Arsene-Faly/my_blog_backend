import { HttpStatusCodeType } from "@/config/http.config";
import { ErrorCodeType } from "@/shared/constants/error-code";

export type ErrorMap = Record<string, string>;

export class AppError extends Error {
  public statusCode: HttpStatusCodeType;
  public errorCode: ErrorCodeType;
  public errors: ErrorMap;
  public success: boolean;

  constructor(
    message: string,
    statusCode: HttpStatusCodeType,
    errorCode: ErrorCodeType,
    errors: ErrorMap = {}
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}
