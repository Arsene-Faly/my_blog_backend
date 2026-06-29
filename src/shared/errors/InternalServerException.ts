import { HTTPSTATUS } from "@/config/http.config";
import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";
import { AppError } from "@/shared/errors/AppError";

export class InternalServerException extends AppError {
  constructor(
    message: string = "Internal Server Error",
    errorCode: ErrorCodeType = ErrorCode.INTERNAL_SERVER_ERROR
  ) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
  }
}

// import { HTTPSTATUS } from "@/config/http.config";
// import { ErrorCode, ErrorCodeType } from "@/shared/constants/error-code";
// import { AppError } from "@/shared/errors/AppError";


// export class InternalServerException extends AppError {
//   constructor(
//     message: string = "Internal Server Error",
//     errorCode: ErrorCodeType = ErrorCode.INTERNAL_SERVER_ERROR
//   ) {
//     super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
//   }
// }