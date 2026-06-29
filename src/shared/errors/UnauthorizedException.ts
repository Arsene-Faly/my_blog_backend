import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";
import { AppError, ErrorMap } from "@/shared/errors/AppError";

export class UnauthorizedException extends AppError {
  constructor(
    message: string = "Unauthorized access",
    errorCode: ErrorCodeType = ErrorCode.ACCESS_UNAUTHORIZED,
    errors: ErrorMap = {}
  ) {
    super(
      message,
      HTTPSTATUS.UNAUTHORIZED,
      errorCode,
      errors
    );
  }
}
// import { HTTPSTATUS } from "@/config/http.config";
// import { AppError } from "@/shared/errors/AppError";
// import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";

// export class UnauthorizedException extends AppError {
//   constructor(
//     message: string = "Unauthorized access",
//     errorCode: ErrorCodeType = ErrorCode.ACCESS_UNAUTHORIZED
//   ) {
//     super(message, HTTPSTATUS.UNAUTHORIZED, errorCode);
//   }
// }