import { ErrorCodeType } from "../../shared/constants/error-code";
import { AppError, ErrorMap } from "../../shared/errors/AppError";
export declare class ValidationException extends AppError {
    constructor(errors: ErrorMap, message?: string, errorCode?: ErrorCodeType);
}
//# sourceMappingURL=ValidationException.d.ts.map