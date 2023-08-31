import { UserRole } from "../../enums/EUserRole";
export declare class CreateUserDto {
    name: string;
    password: string;
    role: UserRole;
}
export declare class LoginUserDto {
    name: string;
    password: string;
}
export declare class RoleUserDto {
    role: UserRole;
}
export declare class UpdateUserDto {
    name: string;
    email: string;
}
export declare class UpdatePassUserDto {
    password: string;
    newPass: string;
}
