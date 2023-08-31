import { CreateUserDto, LoginUserDto, RoleUserDto, UpdatePassUserDto, UpdateUserDto } from "./user.dto";
import { UserService } from "./user.service";
import { Request } from "express";
import { IUser } from "../../interfaces/IUser";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(userBody: CreateUserDto): Promise<Omit<IUser, "password">>;
    login(userBody: LoginUserDto): Promise<Omit<IUser, "password">>;
    logout(req: Request & {
        user?: IUser;
    }): Promise<string>;
    checkAuth(): string;
    getAll(): Promise<IUser[]>;
    delete(id: string): Promise<null>;
    updateRole(userName: string, BodyRole: RoleUserDto): Promise<IUser>;
    updateMe(req: Request & {
        user?: IUser;
    }, updateUser: UpdateUserDto): Promise<IUser>;
    updatePass(req: Request & {
        user?: IUser;
    }, passBody: UpdatePassUserDto): Promise<IUser>;
}
