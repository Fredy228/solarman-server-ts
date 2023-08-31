import { Database, verbose } from "sqlite3";
import { IPost } from "../../interfaces/IPost";
import { OrderPortfolioDto } from "./portfolio.dto";

const sql = verbose();

export const toConnectDB = (): Database => {
  return new sql.Database(
    "database/portfolio.db",
    (err: Error | null): void => {
      if (err) {
        console.error(err.message);
      }
      console.log("Connected to the database.");
    },
  );
};

const toCloseDB = (db: Database): void => {
  db.close((err: Error | null): void => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

export const createPost = async ({
  title,
  year,
  components,
  urlImg,
  galleryUrl,
  id,
}: IPost): Promise<IPost> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    const dateCreated = Date.now();

    db.run(
      `INSERT INTO portfolio(id, title, year, components, urlImg, dateCreated, series, galleryUrl) VALUES(?,?,?,?,?,?,?,?)`,
      [id, title, year, components, urlImg, dateCreated, 0, galleryUrl],
      function (err: Error | null) {
        if (err) reject(err.message);

        const newPost: IPost = {
          id,
          title,
          year,
          components,
          urlImg,
          galleryUrl,
        };

        resolve(newPost);
      },
    );

    toCloseDB(db);
  });
};

export const getPosts = (): Promise<IPost[]> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.all(
      `SELECT * FROM portfolio`,
      [],
      function (err: Error | null, rows: IPost[]) {
        if (err) reject(err.message);

        resolve(rows);
      },
    );

    toCloseDB(db);
  });
};

export const getPostById = (id: string): Promise<IPost> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.get(
      `SELECT * FROM portfolio WHERE id = ?`,
      [id],
      (err: Error | null, row: IPost) => {
        if (err) reject(err.message);

        resolve(row);
      },
    );
    toCloseDB(db);
  });
};

export const deletePosts = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `DELETE FROM portfolio WHERE id = ?`,
      [id],
      function (err: Error | null) {
        if (err) reject(err.message);

        resolve("OK");
      },
    );

    toCloseDB(db);
  });
};

export const updatePost = ({
  id,
  title,
  year,
  components,
  urlImg,
  galleryUrl,
}: Partial<IPost>): Promise<IPost> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `UPDATE portfolio SET title = COALESCE(?, title), year = COALESCE(?, year), components = COALESCE(?, components), urlImg = COALESCE(?, urlImg), galleryUrl = COALESCE(?, galleryUrl) WHERE id = ?`,
      [title, year, components, urlImg, galleryUrl, id],
      function (err: Error | null) {
        if (err) reject(err.message);

        db.get(
          `SELECT * FROM portfolio WHERE id = ?`,
          [id],
          function (err: Error | null, row: IPost) {
            if (err) reject(err.message);

            resolve(row);
          },
        );
      },
    );

    toCloseDB(db);
  });
};

export const updateOrderPosts = (
  objects: Array<OrderPortfolioDto>,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    objects.forEach((element: OrderPortfolioDto) => {
      const { id, series } = element;

      db.run(
        "UPDATE portfolio SET series = ? WHERE id = ?",
        [series, id],
        function (err: Error | null) {
          if (err) reject(err.message);
        },
      );
    });

    resolve("OK");

    toCloseDB(db);
  });
};
