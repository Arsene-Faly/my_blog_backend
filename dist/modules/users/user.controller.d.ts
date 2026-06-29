import { Request, Response } from "express";
import { UserService } from "../../modules/users/user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    update: (req: Request, res: Response, next: import("express").NextFunction) => Promise<any>;
}
//# sourceMappingURL=user.controller.d.ts.map