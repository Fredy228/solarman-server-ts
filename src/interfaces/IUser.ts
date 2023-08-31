import { UserRole } from "../enums/EUserRole";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password: string;
  token?: string;
}
