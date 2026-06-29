export const Verification = {
   EMAIL_VERIFICATION: "EMAIL_VERIFICATION",
   PASSWORD_RESET: "PASSWORD_RESET",
} as const;

export type VerificationType = (typeof Verification)[keyof typeof Verification];