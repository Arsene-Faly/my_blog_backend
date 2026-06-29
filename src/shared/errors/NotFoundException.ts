import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";
import { AppError } from "@/shared/errors/AppError";

export class NotFoundException extends AppError {
  constructor(
    message: string = "Resource not found",
    errorCode: ErrorCodeType = ErrorCode.RESOURCE_NOT_FOUND
  ) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode);
  }
}
// import { HTTPSTATUS } from "@/config/http.config";
// import { AppError } from "@/shared/errors/AppError";
// import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";

// export class NotFoundException extends AppError {
//   constructor(
//     message: string = "Resource not found",
//     errorCode: ErrorCodeType = ErrorCode.RESOURCE_NOT_FOUND
//   ) {
//     super(message, HTTPSTATUS.NOT_FOUND, errorCode);
//   }
// }