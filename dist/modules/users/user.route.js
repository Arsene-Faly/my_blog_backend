"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_module_1 = require("../../modules/users/user.module");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/update", user_module_1.userController.update);
exports.default = userRoutes;
//# sourceMappingURL=user.route.js.map