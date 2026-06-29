"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const app_config_1 = require("./config/app.config");
const errorHandler_middleware_1 = require("./shared/middlewares/errorHandler.middleware");
const asyncHandler_middleware_1 = require("./shared/middlewares/asyncHandler.middleware");
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const user_route_1 = __importDefault(require("./modules/users/user.route"));
const auth_middleware_1 = require("./shared/middlewares/auth.middleware");
const app = (0, express_1.default)();
const BASE_API = app_config_1.config.BASE_API;
app.use((0, helmet_1.default)());
if (app_config_1.config.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://127.0.0.1:5173"
// ];
// app.use(cors({
//   origin: "http://localhost:5173",
//   credentials: true,
//   exposedHeaders: ["set-cookie"] // 🔥 IMPORTANT
// }));
app.use((0, cors_1.default)({
    origin: (origin, callback) => callback(null, origin), // accepte tout, reflète l'origine reçue
    credentials: true,
    exposedHeaders: ["set-cookie"]
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get('/', (0, asyncHandler_middleware_1.asyncHandler)(async (_req, res) => {
    return res.status(200).json({
        message: 'App is perfect running!'
    });
}));
app.use(`${BASE_API}/auth`, auth_route_1.default);
app.use(`${BASE_API}/users`, auth_middleware_1.authMiddleware, user_route_1.default);
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map