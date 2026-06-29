import { ErrorCodeType } from "../../shared/constants/error-code";
import { AppError, ErrorMap } from "../../shared/errors/AppError";
export declare class UnauthorizedException extends AppError {
    constructor(message?: string, errorCode?: ErrorCodeType, errors?: ErrorMap);
}
//# sourceMappingURL=UnauthorizedException.d.ts.map