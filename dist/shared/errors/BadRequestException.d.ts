import { ErrorCodeType } from "../../shared/constants/error-code";
import { AppError } from "../../shared/errors/AppError";
export declare class BadRequestException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeType, errors?: Record<string, string>);
}
//# sourceMappingURL=BadRequestException.d.ts.map