import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Query,
  Param,
  Delete,
  Patch,
} from "@nestjs/common";
import { RolesGuard } from "../../guard/roles.guard";
import { PortfolioService } from "./portfolio.service";
import {
  ImageValidatorPipe,
  JoiValidationPipe,
} from "../../app/pipe/validator.pipe";
import { Roles } from "../../guard/roles.decorator";
import { UserRole } from "../../enums/EUserRole";
import {
  createPostSchema,
  deletePostImgSchema,
  updateOrderSchema,
  updatePostSchema,
} from "../../services/joiValidate";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { CustomException } from "../../services/custom-exception";
import { EStatus } from "../../enums/EStatus";
import { OrderPortfolioDto, PostDto } from "./portfolio.dto";
import { IPost } from "../../interfaces/IPost";
import { PaginationBaseType } from "../../types/paginationType";

@Controller("api/admin/portfolio")
@UseGuards(RolesGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Patch("/order")
  @HttpCode(204)
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UsePipes(new JoiValidationPipe(updateOrderSchema))
  async changeOrder(@Body() orders: Array<OrderPortfolioDto>): Promise<void> {
    return this.portfolioService.orderChange(orders);
  }

  @Post("/")
  @HttpCode(201)
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UsePipes(
    new JoiValidationPipe(createPostSchema),
    new ImageValidatorPipe({ maxSize: 10 }),
  )
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photo", maxCount: 1 },
      { name: "gallery", maxCount: 12 },
    ]),
  )
  async create(
    @UploadedFiles()
    files: {
      photo?: Array<Express.Multer.File>;
      gallery?: Array<Express.Multer.File>;
    },
    @Body() postBody: PostDto,
  ): Promise<IPost> {
    if (!files.photo || !files.gallery)
      throw new CustomException(
        EStatus.BAD_REQUEST,
        "Ви не завантажили всі зображення",
      );

    return await this.portfolioService.postCreate(
      postBody,
      files.photo,
      files.gallery,
    );
  }

  @Get("/")
  @HttpCode(200)
  @Roles()
  async getAll(
    @Query() { limit = 6, page = 1 }: PaginationBaseType,
  ): Promise<{ posts: IPost[]; total: number }> {
    return this.portfolioService.getAllPost(limit, page);
  }

  @Get("/:idPost")
  @HttpCode(200)
  @Roles()
  async getById(@Param("idPost") id: string): Promise<IPost> {
    return this.portfolioService.getById(id);
  }

  @Delete("/:idPost")
  @HttpCode(204)
  @Roles(UserRole.Admin, UserRole.Moderator)
  async delete(@Param("idPost") id: string): Promise<void> {
    return await this.portfolioService.postDelete(id);
  }

  @Delete("/image/:idPost")
  @HttpCode(204)
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UsePipes(new JoiValidationPipe(deletePostImgSchema))
  async deletePostImg(
    @Param("idPost") id: string,
    @Body() { urlMini }: { urlMini: string },
  ): Promise<void> {
    return this.portfolioService.postImageDelete(id, urlMini);
  }

  @Patch("/:idPost")
  @HttpCode(200)
  @Roles(UserRole.Admin, UserRole.Moderator)
  @UsePipes(
    new JoiValidationPipe(updatePostSchema),
    new ImageValidatorPipe({ maxSize: 10 }),
  )
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "photo", maxCount: 1 },
      { name: "gallery", maxCount: 12 },
    ]),
  )
  async postUpdate(
    @UploadedFiles()
    files: {
      photo?: Array<Express.Multer.File>;
      gallery?: Array<Express.Multer.File>;
    },
    @Param("idPost") id: string,
    @Body() bodyPost: PostDto,
  ): Promise<IPost> {
    return this.portfolioService.postUpdate(id, bodyPost, files);
  }
}
