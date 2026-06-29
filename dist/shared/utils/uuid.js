"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueCode = void 0;
const uuid_1 = require("uuid");
const generateUniqueCode = () => (0, uuid_1.v4)().replace(/-/g, "").substring(0, 30);
exports.generateUniqueCode = generateUniqueCode;
//# sourceMappingURL=uuid.js.map