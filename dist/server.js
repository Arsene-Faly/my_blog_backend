"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("tsconfig-paths/register");
require("dotenv/config");
const app_config_1 = require("./config/app.config");
const database_1 = require("./database/database");
const app_1 = __importDefault(require("./app"));
// import AuthSessionModel from "./modules/auth/models/AuthSession.model";
const PORT = app_config_1.config.PORT || 8001;
async function bootstrap() {
    app_1.default.listen(PORT, async () => {
        await (0, database_1.connectDatabase)();
        console.log(`Server is running on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=server.js.map