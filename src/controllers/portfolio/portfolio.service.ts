import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import { OrderPortfolioDto, PostDto } from "./portfolio.dto";
import { ImageService } from "../../services/ImageService";
import {
  createPost,
  getPosts,
  getPostById,
  deletePosts,
  updatePost,
  updateOrderPosts,
} from "./portfolioDB.service";
import { CustomException } from "../../services/custom-exception";
import { EStatus } from "../../enums/EStatus";
import { IPost } from "../../interfaces/IPost";
import { paginationFn } from "../../services/pagination";

export class PortfolioService {
  async postCreate(
    { title, year, components }: PostDto,
    photo: Array<Express.Multer.File>,
    gallery: Array<Express.Multer.File>,
  ): Promise<IPost> {
    if (!JSON.parse(components))
      throw new CustomException(
        EStatus.BAD_REQUEST,
        "/components/ must be string[]",
      );

    const idPost = uuidv4();

    const urlImg = await ImageService.save(
      photo[0],
      { width: 450, height: 300 },
      "images",
      "portfolio",
      idPost,
    );

    const galleryMini = await ImageService.saveMany(
      [...photo, ...gallery],
      { height: 300, width: 450 },
      "images",
      "portfolio",
      idPost,
    );

    const galleryOriginal = await ImageService.saveMany(
      [...photo, ...gallery],
      { height: 1000, width: 1800 },
      "images",
      "portfolio",
      idPost,
    );

    const galleryUrl = galleryMini.map((item, index) => {
      return {
        original: galleryOriginal[index],
        mini: item,
      };
    });

    return await createPost({
      title,
      year,
      components: components,
      urlImg,
      galleryUrl: JSON.stringify(galleryUrl),
      id: idPost,
    });
  }

  async getAllPost(
    limit: number,
    page: number,
  ): Promise<{ posts: IPost[]; total: number }> {
    const posts = await getPosts();

    const sortArray = posts.sort((a, b) => a.series - b.series);
    const paginatedArray = paginationFn(sortArray, limit, page);

    return {
      posts: paginatedArray,
      total: sortArray.length,
    };
  }

  async getById(id: string): Promise<IPost> {
    const post = await getPostById(id);

    if (!post)
      throw new CustomException(
        EStatus.NOT_FOUND,
        `Post по id: ${id} не знайдено`,
      );

    return post;
  }

  async postDelete(id: string): Promise<void> {
    const post = await this.getById(id);

    const filePathFolder = join(
      __dirname,
      "..",
      "..",
      "..",
      "static",
      "images",
      "portfolio",
      `${post.id}`,
    );

    console.log(filePathFolder);

    await ImageService.deleteFolders([filePathFolder]);

    await deletePosts(id);
  }

  async postImageDelete(id: string, urlMini: string): Promise<void> {
    const post = await this.getById(id);

    const updatedGallery = JSON.parse(post.galleryUrl).filter(
      (item: { mini: string }) => urlMini !== item.mini,
    );
    const foundUrls = JSON.parse(post.galleryUrl).find(
      (item: { mini: string }) => urlMini === item.mini,
    );

    const filePath1 = join(
      __dirname,
      "..",
      "..",
      "..",
      "static",
      `${foundUrls.mini}`,
    );
    await ImageService.deleteImages([filePath1]);
    const filePath2 = join(
      __dirname,
      "..",
      "..",
      "..",
      "static",
      `${foundUrls.original}`,
    );
    await ImageService.deleteImages([filePath2]);

    await updatePost({ id, galleryUrl: JSON.stringify(updatedGallery) });
  }

  async postUpdate(
    id: string,
    { title, year, components }: PostDto,
    files: {
      photo?: Array<Express.Multer.File>;
      gallery?: Array<Express.Multer.File>;
    },
  ): Promise<IPost> {
    const post = await this.getById(id);

    let urlImg = undefined;
    let galleryUrl = post.galleryUrl ? JSON.parse(post.galleryUrl) : undefined;

    const { photo, gallery } = files;

    if (photo) {
      const filePath = join(
        __dirname,
        "..",
        "..",
        "..",
        "static",
        `${post.urlImg}`,
      );
      await ImageService.deleteImages([filePath]);

      urlImg = await ImageService.save(
        photo[0],
        { width: 450, height: 300 },
        "images",
        "portfolio",
        id,
      );
    }

    if (gallery) {
      const galleryMini = await ImageService.saveMany(
        gallery,
        { height: 300, width: 450 },
        "images",
        "portfolio",
        id,
      );

      const galleryOriginal = await ImageService.saveMany(
        gallery,
        { height: 1000, width: 1800 },
        "images",
        "portfolio",
        id,
      );

      const galleryPaths = galleryMini.map((item, index) => {
        return {
          original: galleryOriginal[index],
          mini: item,
        };
      });

      if (galleryUrl) {
        galleryUrl.push(...galleryPaths);
      } else {
        galleryUrl = galleryPaths;
      }
    }

    return await updatePost({
      id,
      title,
      year,
      components,
      urlImg,
      galleryUrl: JSON.stringify(galleryUrl),
    });
  }

  async orderChange(orders: Array<OrderPortfolioDto>): Promise<void> {
    await updateOrderPosts(orders);
  }
}
