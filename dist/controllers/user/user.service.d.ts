import { CreateUserDto, LoginUserDto, UpdatePassUserDto, UpdateUserDto } from "./user.dto";
import { IUser } from "../../interfaces/IUser";
import { UserRole } from "../../enums/EUserRole";
export declare class UserService {
    registerUser(userBody: CreateUserDto): Promise<Omit<IUser, "password">>;
    loginUser(userBody: LoginUserDto): Promise<Omit<IUser, "password">>;
    logoutUser(user: IUser): Promise<string>;
    getAllUsers(): Promise<IUser[]>;
    deleteUserById(id: string): Promise<null>;
    updateRoleUser(userName: string, newRole: UserRole): Promise<IUser>;
    updateUser(id: string, updateFields: UpdateUserDto): Promise<IUser>;
    updatePassUser(user: IUser, { password, newPass }: UpdatePassUserDto): Promise<IUser>;
}
