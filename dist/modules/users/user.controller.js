"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const asyncHandler_middleware_1 = require("../../shared/middlewares/asyncHandler.middleware");
const users_validator_1 = require("../../modules/users/users.validator");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    update = (0, asyncHandler_middleware_1.asyncHandler)(async (req, res) => {
        const data = users_validator_1.updateUserValidator.parse(req.body);
        await this.userService.update(data);
        return res.status(200).json({
            message: "Updated user successfully",
            data: {
                name: data.name,
                email: data.email,
            }
        });
    });
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map