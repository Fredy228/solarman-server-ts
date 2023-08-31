import {
  CreateUserDto,
  LoginUserDto,
  UpdatePassUserDto,
  UpdateUserDto,
} from "./user.dto";
import {
  createUser,
  deleteUser,
  getUserByName,
  getUsers,
  updatePass,
  updateUser,
} from "./userDB.service";
import { CustomException } from "../../services/custom-exception";
import { EStatus } from "../../enums/EStatus";
import { IUser } from "../../interfaces/IUser";
import { checkPassword } from "../../services/hashPassword";
import { singToken } from "../../services/createToken";
import { UserRole } from "../../enums/EUserRole";

export class UserService {
  async registerUser(
    userBody: CreateUserDto,
  ): Promise<Omit<IUser, "password">> {
    const isName = await getUserByName(userBody.name);

    if (isName)
      throw new CustomException(
        EStatus.BAD_REQUEST,
        `Ім'я ${userBody.name} вже зайнято`,
      );

    return await createUser(userBody);
  }

  async loginUser(userBody: LoginUserDto): Promise<Omit<IUser, "password">> {
    const user = await getUserByName(userBody.name);

    if (!user)
      throw new CustomException(
        EStatus.UNAUTHORIZED,
        `Username або пароль невірний :(`,
      );

    const passIsValid: boolean = await checkPassword(
      userBody.password,
      user.password,
    );

    if (!passIsValid)
      throw new CustomException(
        EStatus.UNAUTHORIZED,
        `Username або пароль невірний :(`,
      );

    const token = singToken(user.id);
    const userUpdate = await updateUser({ token, id: user.id });
    userUpdate.password = undefined;
    return userUpdate;
  }

  async logoutUser(user: IUser): Promise<string> {
    await updateUser({ token: "null", id: user.id });
    return "Logged out";
  }

  async getAllUsers(): Promise<IUser[]> {
    return await getUsers();
  }

  async deleteUserById(id: string): Promise<null> {
    await deleteUser(id);
    return null;
  }

  async updateRoleUser(userName: string, newRole: UserRole): Promise<IUser> {
    const user = await getUserByName(userName);

    if (!user)
      throw new CustomException(
        EStatus.NOT_FOUND,
        `Користувач ${userName} не знайдений в базі даних`,
      );

    const updatedUser = await updateUser({ role: newRole, id: user.id });
    updatedUser.password = undefined;

    return updatedUser;
  }

  async updateUser(id: string, updateFields: UpdateUserDto): Promise<IUser> {
    const user = await getUserByName(updateFields.name);

    if (user)
      throw new CustomException(
        EStatus.BAD_REQUEST,
        `Користувач ${updateFields.name} не знайдений в базі даних`,
      );

    const updatedUser = await updateUser({ ...updateFields, id });
    updatedUser.password = undefined;

    return updatedUser;
  }
  async updatePassUser(
    user: IUser,
    { password, newPass }: UpdatePassUserDto,
  ): Promise<IUser> {
    const passIsValid = await checkPassword(password, user.password);

    if (!passIsValid)
      throw new CustomException(
        EStatus.BAD_REQUEST,
        `Username або пароль невірний`,
      );

    const updatedUser = await updatePass({ password: newPass, id: user.id });
    updatedUser.password = undefined;

    return updatedUser;
  }
}
