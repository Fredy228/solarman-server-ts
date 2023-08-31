import { UserRole } from "../../enums/EUserRole";

export class CreateUserDto {
  name: string;
  password: string;
  role: UserRole;
}

export class LoginUserDto {
  name: string;
  password: string;
}

export class RoleUserDto {
  role: UserRole;
}

export class UpdateUserDto {
  name: string;
  email: string;
}

export class UpdatePassUserDto {
  password: string;
  newPass: string;
}
