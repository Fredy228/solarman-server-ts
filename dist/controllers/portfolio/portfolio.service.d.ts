/// <reference types="multer" />
import { OrderPortfolioDto, PostDto } from "./portfolio.dto";
import { IPost } from "../../interfaces/IPost";
export declare class PortfolioService {
    postCreate({ title, year, components }: PostDto, photo: Array<Express.Multer.File>, gallery: Array<Express.Multer.File>): Promise<IPost>;
    getAllPost(limit: number, page: number): Promise<{
        posts: IPost[];
        total: number;
    }>;
    getById(id: string): Promise<IPost>;
    postDelete(id: string): Promise<void>;
    postImageDelete(id: string, urlMini: string): Promise<void>;
    postUpdate(id: string, { title, year, components }: PostDto, files: {
        photo?: Array<Express.Multer.File>;
        gallery?: Array<Express.Multer.File>;
    }): Promise<IPost>;
    orderChange(orders: Array<OrderPortfolioDto>): Promise<void>;
}
