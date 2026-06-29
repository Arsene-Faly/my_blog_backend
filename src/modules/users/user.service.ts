import { UpdateUserDTO } from "@/modules/users/users.dto";
import UserModel from "@/modules/users/models/user.model";

export class UserService {
    public async update(data: UpdateUserDTO) {
        const { userId, name, email } = data;

        await UserModel.findByIdAndUpdate(userId, {
            name,
            email,
        });

        return { message: "User updated" };
    }
}