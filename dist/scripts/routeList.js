"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
require("dotenv/config");
const app_config_1 = require("../config/app.config");
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const express_list_routes_1 = __importDefault(require("express-list-routes"));
// import app from "../app";
// import authRoutes from "@/modules/auth/routes/auth.route";
const BASE_API = app_config_1.config.BASE_API;
console.log(`\n📌 Registered Routes\n`);
// expressListRoutes(app, { prefix: BASE_API });
console.log("\n\x1b[1m\x1b[36m┌─────────────────────────────┐\x1b[0m");
console.log("\x1b[1m\x1b[36m│        🔐  Auth Routes       │\x1b[0m");
console.log("\x1b[1m\x1b[36m└─────────────────────────────┘\x1b[0m");
(0, express_list_routes_1.default)(auth_route_1.default, { prefix: `${BASE_API}/auth` });
// console.log("\n\x1b[1m\x1b[33m┌─────────────────────────────┐\x1b[0m");
// console.log(  "\x1b[1m\x1b[33m│        👤  User Routes       │\x1b[0m");
// console.log(  "\x1b[1m\x1b[33m└─────────────────────────────┘\x1b[0m");
// expressListRoutes(userRoutes, { prefix: `${BASE_API}/users` });
//# sourceMappingURL=routeList.js.map