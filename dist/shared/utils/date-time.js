"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemainingTime = exports.AfterResetPasswordExpirationDate = exports.ResetPasswordExpirationDate = exports.calculateExpirationDate = exports.fortyFiveMinutesFromNow = exports.thirtyDaysFromNow = exports.EmailVerificationExpirationDate = exports.SessionExpirationDate = void 0;
const date_fns_1 = require("date-fns");
/**
 * Maintenant + 7 jours
 * @returns
 */
// export const SessionExpirationDate = (): Date => 
//     new Date(Date.now() + 1 * 60 * 1000);
const SessionExpirationDate = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
exports.SessionExpirationDate = SessionExpirationDate;
/**
 * Maintenant + 2 jours
 * @returns
 */
const EmailVerificationExpirationDate = () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
exports.EmailVerificationExpirationDate = EmailVerificationExpirationDate;
/**
 * Maintenant + 30 jours
 * @returns
 */
const thirtyDaysFromNow = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
exports.thirtyDaysFromNow = thirtyDaysFromNow;
/**
 * Maintenant + 45 minutes
 * @returns
 */
const fortyFiveMinutesFromNow = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 45);
    return now;
};
exports.fortyFiveMinutesFromNow = fortyFiveMinutesFromNow;
const calculateExpirationDate = (expiresIn = "15m") => {
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match?.[1] || !match?.[2])
        throw new Error(`Invalid expiresIn: ${expiresIn}`);
    const value = parseInt(match[1], 10);
    const unit = match[2];
    const now = new Date();
    switch (unit) {
        case "s": return (0, date_fns_1.add)(now, { seconds: value });
        case "m": return (0, date_fns_1.add)(now, { minutes: value });
        case "h": return (0, date_fns_1.add)(now, { hours: value });
        case "d": return (0, date_fns_1.add)(now, { days: value });
    }
};
exports.calculateExpirationDate = calculateExpirationDate;
//Date d'expiration de la vérification de mail est de 5min
const ResetPasswordExpirationDate = () => new Date(Date.now() + 5 * 60 * 1000);
exports.ResetPasswordExpirationDate = ResetPasswordExpirationDate;
//Date d'expiration après la réinitialisation du mot de passe est de 7heures
const AfterResetPasswordExpirationDate = () => new Date(Date.now() + 7 * 60 * 60 * 1000);
exports.AfterResetPasswordExpirationDate = AfterResetPasswordExpirationDate;
const getRemainingTime = (expiresAt) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) {
        return "0 minute";
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}min ${seconds}s`;
};
exports.getRemainingTime = getRemainingTime;
//# sourceMappingURL=date-time.js.map