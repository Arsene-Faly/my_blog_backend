import { HttpStatusCodeType } from "../../config/http.config";
import { ErrorCodeType } from "../../shared/constants/error-code";
export type ErrorMap = Record<string, string>;
export declare class AppError extends Error {
    statusCode: HttpStatusCodeType;
    errorCode: ErrorCodeType;
    errors: ErrorMap;
    success: boolean;
    constructor(message: string, statusCode: HttpStatusCodeType, errorCode: ErrorCodeType, errors?: ErrorMap);
}
//# sourceMappingURL=AppError.d.ts.map