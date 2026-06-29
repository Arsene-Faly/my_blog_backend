/**
 * Maintenant + 7 jours
 * @returns
 */
export declare const SessionExpirationDate: () => Date;
/**
 * Maintenant + 2 jours
 * @returns
 */
export declare const EmailVerificationExpirationDate: () => Date;
/**
 * Maintenant + 30 jours
 * @returns
 */
export declare const thirtyDaysFromNow: () => Date;
/**
 * Maintenant + 45 minutes
 * @returns
 */
export declare const fortyFiveMinutesFromNow: () => Date;
export declare const calculateExpirationDate: (expiresIn?: string) => Date;
export declare const ResetPasswordExpirationDate: () => Date;
export declare const AfterResetPasswordExpirationDate: () => Date;
export declare const getRemainingTime: (expiresAt: Date) => string;
//# sourceMappingURL=date-time.d.ts.map