"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortfolioService = void 0;
const uuid_1 = require("uuid");
const path_1 = require("path");
const ImageService_1 = require("../../services/ImageService");
const portfolioDB_service_1 = require("./portfolioDB.service");
const custom_exception_1 = require("../../services/custom-exception");
const EStatus_1 = require("../../enums/EStatus");
const pagination_1 = require("../../services/pagination");
class PortfolioService {
    async postCreate({ title, year, components }, photo, gallery) {
        if (!JSON.parse(components))
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, "/components/ must be string[]");
        const idPost = (0, uuid_1.v4)();
        const urlImg = await ImageService_1.ImageService.save(photo[0], { width: 450, height: 300 }, "images", "portfolio", idPost);
        const galleryMini = await ImageService_1.ImageService.saveMany([...photo, ...gallery], { height: 300, width: 450 }, "images", "portfolio", idPost);
        const galleryOriginal = await ImageService_1.ImageService.saveMany([...photo, ...gallery], { height: 1000, width: 1800 }, "images", "portfolio", idPost);
        const galleryUrl = galleryMini.map((item, index) => {
            return {
                original: galleryOriginal[index],
                mini: item,
            };
        });
        return await (0, portfolioDB_service_1.createPost)({
            title,
            year,
            components: components,
            urlImg,
            galleryUrl: JSON.stringify(galleryUrl),
            id: idPost,
        });
    }
    async getAllPost(limit, page) {
        const posts = await (0, portfolioDB_service_1.getPosts)();
        const sortArray = posts.sort((a, b) => a.series - b.series);
        const paginatedArray = (0, pagination_1.paginationFn)(sortArray, limit, page);
        return {
            posts: paginatedArray,
            total: sortArray.length,
        };
    }
    async getById(id) {
        const post = await (0, portfolioDB_service_1.getPostById)(id);
        if (!post)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.NOT_FOUND, `Post по id: ${id} не знайдено`);
        return post;
    }
    async postDelete(id) {
        const post = await this.getById(id);
        const filePathFolder = (0, path_1.join)(__dirname, "..", "..", "..", "static", "images", "portfolio", `${post.id}`);
        console.log(filePathFolder);
        await ImageService_1.ImageService.deleteFolders([filePathFolder]);
        await (0, portfolioDB_service_1.deletePosts)(id);
    }
    async postImageDelete(id, urlMini) {
        const post = await this.getById(id);
        const updatedGallery = JSON.parse(post.galleryUrl).filter((item) => urlMini !== item.mini);
        const foundUrls = JSON.parse(post.galleryUrl).find((item) => urlMini === item.mini);
        const filePath1 = (0, path_1.join)(__dirname, "..", "..", "..", "static", `${foundUrls.mini}`);
        await ImageService_1.ImageService.deleteImages([filePath1]);
        const filePath2 = (0, path_1.join)(__dirname, "..", "..", "..", "static", `${foundUrls.original}`);
        await ImageService_1.ImageService.deleteImages([filePath2]);
        await (0, portfolioDB_service_1.updatePost)({ id, galleryUrl: JSON.stringify(updatedGallery) });
    }
    async postUpdate(id, { title, year, components }, files) {
        const post = await this.getById(id);
        let urlImg = undefined;
        let galleryUrl = post.galleryUrl ? JSON.parse(post.galleryUrl) : undefined;
        const { photo, gallery } = files;
        if (photo) {
            const filePath = (0, path_1.join)(__dirname, "..", "..", "..", "static", `${post.urlImg}`);
            await ImageService_1.ImageService.deleteImages([filePath]);
            urlImg = await ImageService_1.ImageService.save(photo[0], { width: 450, height: 300 }, "images", "portfolio", id);
        }
        if (gallery) {
            const galleryMini = await ImageService_1.ImageService.saveMany(gallery, { height: 300, width: 450 }, "images", "portfolio", id);
            const galleryOriginal = await ImageService_1.ImageService.saveMany(gallery, { height: 1000, width: 1800 }, "images", "portfolio", id);
            const galleryPaths = galleryMini.map((item, index) => {
                return {
                    original: galleryOriginal[index],
                    mini: item,
                };
            });
            if (galleryUrl) {
                galleryUrl.push(...galleryPaths);
            }
            else {
                galleryUrl = galleryPaths;
            }
        }
        return await (0, portfolioDB_service_1.updatePost)({
            id,
            title,
            year,
            components,
            urlImg,
            galleryUrl: JSON.stringify(galleryUrl),
        });
    }
    async orderChange(orders) {
        await (0, portfolioDB_service_1.updateOrderPosts)(orders);
    }
}
exports.PortfolioService = PortfolioService;
//# sourceMappingURL=portfolio.service.js.map