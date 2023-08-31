import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { RolesGuard } from "../../guard/roles.guard";
import { ComponentsService } from "./components.service";
import { Roles } from "../../guard/roles.decorator";
import { UserRole } from "../../enums/EUserRole";
import {
  ImageValidatorPipe,
  JoiValidationPipe,
} from "../../app/pipe/validator.pipe";
import { CreateStoreComponentsSchema } from "../../services/joiValidate";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ComponentsDto } from "./components.dto";
import { ISortOption, IStoreComponents } from "../../interfaces/IStore";
import { ETypeComponents } from "../../enums/EStoreType";
import { TPaginationComponents } from "../../types/paginationType";

@Controller("api/admin/store-components")
@UseGuards(RolesGuard)
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post("/")
  @HttpCode(201)
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UsePipes(
    new JoiValidationPipe(CreateStoreComponentsSchema),
    new ImageValidatorPipe({ maxSize: 1 }),
  )
  @UseInterceptors(FileFieldsInterceptor([{ name: "photo", maxCount: 1 }]))
  async create(
    @UploadedFiles()
    files: {
      photo?: Array<Express.Multer.File>;
    },
    @Body() bodyComponent: ComponentsDto,
  ): Promise<IStoreComponents> {
    return this.componentsService.create(files.photo, bodyComponent);
  }

  @Get("/option")
  @HttpCode(200)
  @Roles()
  async getOption(
    @Query("type") type: ETypeComponents = ETypeComponents.All,
  ): Promise<ISortOption> {
    return this.componentsService.getOptions(type);
  }

  @Get("/:idComponent")
  @HttpCode(200)
  @Roles()
  async getById(@Param("idComponent") id: string): Promise<IStoreComponents> {
    return this.componentsService.getById(id);
  }

  @Delete("/:idComponent")
  @HttpCode(204)
  @Roles(UserRole.Admin, UserRole.Moderator)
  async deleteById(@Param("idComponent") id: string): Promise<void> {
    return this.componentsService.deleteById(id);
  }

  @Get("/")
  @HttpCode(200)
  @Roles()
  async getAll(
    @Query()
    { limit = 6, page = 1, type = ETypeComponents.All }: TPaginationComponents,
  ): Promise<IStoreComponents[]> {
    return this.componentsService.getAll(type, limit, page);
  }
}
