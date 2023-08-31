import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  HttpCode,
  Req,
  Get,
  Delete,
  Param,
  Patch,
} from "@nestjs/common";

import { RolesGuard } from "../../guard/roles.guard";
import { Roles } from "../../guard/roles.decorator";
import { UserRole } from "../../enums/EUserRole";
import {
  CreateUserDto,
  LoginUserDto,
  RoleUserDto,
  UpdatePassUserDto,
  UpdateUserDto,
} from "./user.dto";
import { JoiValidationPipe } from "../../app/pipe/validator.pipe";
import { userCreateSchema, userUpdateSchema } from "../../services/joiValidate";
import { UserService } from "./user.service";
import { Request } from "express";
import { IUser } from "../../interfaces/IUser";

@Controller("api/admin")
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("/register")
  @HttpCode(201)
  @Roles(UserRole.Admin)
  @UsePipes(new JoiValidationPipe(userCreateSchema))
  async create(@Body() userBody: CreateUserDto) {
    return this.userService.registerUser(userBody);
  }

  @Post("/login")
  @HttpCode(200)
  @Roles()
  async login(@Body() userBody: LoginUserDto) {
    return this.userService.loginUser(userBody);
  }

  @Post("/logout")
  @HttpCode(204)
  @Roles()
  async logout(@Req() req: Request & { user?: IUser }): Promise<string> {
    const { user } = req;
    return this.userService.logoutUser(user);
  }

  @Get("/check-auth")
  @HttpCode(200)
  @Roles()
  checkAuth(): string {
    return "Authorized";
  }

  @Get("/users")
  @HttpCode(200)
  @Roles(UserRole.Admin)
  getAll(): Promise<IUser[]> {
    return this.userService.getAllUsers();
  }

  @Delete("/delete/:id")
  @HttpCode(200)
  @Roles(UserRole.Admin)
  async delete(@Param("id") id: string): Promise<null> {
    return this.userService.deleteUserById(id);
  }

  @Patch("/update-role/:userName")
  @HttpCode(200)
  @Roles(UserRole.Admin)
  @UsePipes(new JoiValidationPipe(userUpdateSchema))
  async updateRole(
    @Param("userName") userName: string,
    @Body() BodyRole: RoleUserDto,
  ): Promise<IUser> {
    return this.userService.updateRoleUser(userName, BodyRole.role);
  }

  @Patch("/update-me")
  @HttpCode(200)
  @Roles()
  @UsePipes(new JoiValidationPipe(userUpdateSchema))
  async updateMe(
    @Req() req: Request & { user?: IUser },
    @Body() updateUser: UpdateUserDto,
  ): Promise<IUser> {
    const { user } = req;
    return this.userService.updateUser(user.id, updateUser);
  }

  @Patch("/update-pass")
  @HttpCode(200)
  @Roles()
  @UsePipes(new JoiValidationPipe(userUpdateSchema))
  async updatePass(
    @Req() req: Request & { user?: IUser },
    @Body() passBody: UpdatePassUserDto,
  ): Promise<IUser> {
    const { user } = req;
    return this.userService.updatePassUser(user, passBody);
  }
}
