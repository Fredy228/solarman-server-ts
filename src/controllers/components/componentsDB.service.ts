import { Database, verbose } from "sqlite3";
import { IStoreComponents } from "../../interfaces/IStore";
import { ComponentsDto } from "./components.dto";
import { ETypeComponents } from "../../enums/EStoreType";

const sql = verbose();

export const toConnectDB = (): Database => {
  return new sql.Database("database/store.db", (err: Error | null): void => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  });
};

const toCloseDB = (db: Database): void => {
  db.close((err: Error | null): void => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
};

export const createComponent = async ({
  id,
  title,
  type,
  cost,
  photo,
  brand,
  country,
  optionSort,
  descripMain,
  descripCharacter,
}: ComponentsDto): Promise<IStoreComponents> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `INSERT INTO components(id, title , type , cost , photo , brand , country , optionSort , descripMain, descripCharacter ) VALUES(?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        title,
        type,
        cost,
        photo,
        brand,
        country,
        optionSort,
        descripMain,
        descripCharacter,
      ],
      function (err: Error | null) {
        if (err) reject(err);

        resolve({
          id,
          title,
          type,
          cost,
          photo,
          brand,
          country,
          optionSort: JSON.parse(optionSort),
          descripMain: JSON.parse(descripMain),
          descripCharacter: JSON.parse(descripCharacter),
        });
      },
    );

    toCloseDB(db);
  });
};

export const getComponents = (
  type: ETypeComponents,
): Promise<IStoreComponents[]> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    let query = "SELECT * FROM components";

    if (type !== ETypeComponents.All) {
      query += ` WHERE type = ?`;

      db.all(
        query,
        [type],
        function (err: Error | null, rows: IStoreComponents[]) {
          if (err) reject(err.message);

          resolve(rows);
        },
      );
    }

    if (type === ETypeComponents.All) {
      db.all(query, function (err: Error | null, rows: IStoreComponents[]) {
        if (err) reject(err.message);

        resolve(rows);
      });
    }

    toCloseDB(db);
  });
};

export const getOneComponent = (id: string): Promise<IStoreComponents> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.get(
      `SELECT * FROM components WHERE id = ?`,
      [id],
      (err: Error | null, row: IStoreComponents) => {
        if (err) reject(err.message);

        resolve(row);
      },
    );
    toCloseDB(db);
  });
};

export const deleteComponents = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `DELETE FROM components WHERE id = ?`,
      [id],
      function (err: Error | null) {
        if (err) reject(err);

        resolve();
      },
    );

    toCloseDB(db);
  });
};

const updateComponent = ({
  id,
  title,
  type,
  cost,
  photo,
  brand,
  country,
  optionSort,
  descripMain,
  descripCharacter,
}: ComponentsDto): Promise<IStoreComponents> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `UPDATE components SET title = COALESCE(?, title), type = COALESCE(?, type), cost = COALESCE(?, cost), photo = COALESCE(?, photo), brand = COALESCE(?, brand), country = COALESCE(?, country), optionSort = COALESCE(?, optionSort), descripMain = COALESCE(?, descripMain), descripCharacter = COALESCE(?, descripCharacter) WHERE id = ?`,
      [
        title,
        type,
        cost,
        photo,
        brand,
        country,
        optionSort,
        descripMain,
        descripCharacter,
        id,
      ],
      function (err: Error | null) {
        if (err) reject(err.message);

        db.get(
          `SELECT * FROM components WHERE id = ?`,
          [id],
          function (err: Error | null, row: IStoreComponents) {
            if (err) reject(err.message);

            resolve(row);
          },
        );
      },
    );

    toCloseDB(db);
  });
};
