import "tsconfig-paths/register";
import "dotenv/config";
import { config } from "@/config/app.config";
import authRoutes from "@/modules/auth/auth.route";
import expressListRoutes from "express-list-routes";
// import app from "@/app";
// import authRoutes from "@/modules/auth/routes/auth.route";

const BASE_API = config.BASE_API;

console.log(`\n📌 Registered Routes\n`);

// expressListRoutes(app, { prefix: BASE_API });

console.log("\n\x1b[1m\x1b[36m┌─────────────────────────────┐\x1b[0m");
console.log(  "\x1b[1m\x1b[36m│        🔐  Auth Routes       │\x1b[0m");
console.log(  "\x1b[1m\x1b[36m└─────────────────────────────┘\x1b[0m");
expressListRoutes(authRoutes, { prefix: `${BASE_API}/auth` });

// console.log("\n\x1b[1m\x1b[33m┌─────────────────────────────┐\x1b[0m");
// console.log(  "\x1b[1m\x1b[33m│        👤  User Routes       │\x1b[0m");
// console.log(  "\x1b[1m\x1b[33m└─────────────────────────────┘\x1b[0m");
// expressListRoutes(userRoutes, { prefix: `${BASE_API}/users` });

