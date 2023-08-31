/// <reference types="multer" />
import { PortfolioService } from "./portfolio.service";
import { OrderPortfolioDto, PostDto } from "./portfolio.dto";
import { IPost } from "../../interfaces/IPost";
import { PaginationBaseType } from "../../types/paginationType";
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    changeOrder(orders: Array<OrderPortfolioDto>): Promise<void>;
    create(files: {
        photo?: Array<Express.Multer.File>;
        gallery?: Array<Express.Multer.File>;
    }, postBody: PostDto): Promise<IPost>;
    getAll({ limit, page }: PaginationBaseType): Promise<{
        posts: IPost[];
        total: number;
    }>;
    getById(id: string): Promise<IPost>;
    delete(id: string): Promise<void>;
    deletePostImg(id: string, { urlMini }: {
        urlMini: string;
    }): Promise<void>;
    postUpdate(files: {
        photo?: Array<Express.Multer.File>;
        gallery?: Array<Express.Multer.File>;
    }, id: string, bodyPost: PostDto): Promise<IPost>;
}
