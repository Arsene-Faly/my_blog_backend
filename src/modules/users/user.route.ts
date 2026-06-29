import { Router } from "express";
import { userController } from "@/modules/users/user.module";

const userRoutes = Router();

userRoutes.post("/update", userController.update);

export default userRoutes;