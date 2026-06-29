"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../../database/database");
async function resetDatabase() {
    try {
        await (0, database_1.connectDatabase)();
        console.log("🔄 Running database reset----------");
        await mongoose_1.default.connection.dropDatabase();
        console.log("✅ Database reset successfully----------");
    }
    catch (error) {
        console.error("❌Database reset failed", error);
    }
    finally {
        await mongoose_1.default.connection.close();
        process.exit(0);
    }
}
resetDatabase();
//# sourceMappingURL=db.reset.js.map