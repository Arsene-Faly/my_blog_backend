import { Request, Response } from "express";
import { UserService } from "@/modules/users/user.service";
import { asyncHandler } from "@/shared/middlewares/asyncHandler.middleware";
import { updateUserValidator } from "@/modules/users/users.validator";

export class UserController {
    constructor(private userService: UserService) {}

    public update = asyncHandler(
        async(req: Request, res: Response): Promise<any> => {
           
            const data = updateUserValidator.parse(req.body);
            await this.userService.update(data);
            
            return res.status(200).json({
                message: "Updated user successfully",
                data:  {
                    name: data.name,
                    email: data.email,
                }
            });
        }
    );
}