import { Database, verbose } from "sqlite3";
import { v4 as uuidv4 } from "uuid";

import { IUser } from "../../interfaces/IUser";
import { hashPassword } from "../../services/hashPassword";
import { singToken } from "../../services/createToken";
import { CreateUserDto } from "./user.dto";

const sql = verbose();

export const toConnectDB = (): Database => {
  return new sql.Database("database/users.db", (err: Error | null): void => {
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

export const createUser = async (
  newUser: CreateUserDto,
): Promise<Omit<IUser, "password">> => {
  const hashedPass = await hashPassword(newUser.password);

  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    const id = uuidv4();
    const token = singToken(id);

    db.run(
      `INSERT INTO users(id, name, email, role, password, token) VALUES(?,?,?,?,?,?)`,
      [
        id,
        newUser.name,
        "solarmanua@gmail.com",
        newUser.role,
        hashedPass,
        token,
      ],
      function (err: Error | null) {
        if (err) reject(err.message);

        const createdUser: Omit<IUser, "password"> = {
          id,
          name: newUser.name,
          email: "solarmanua@gmail.com",
          role: newUser.role,
          token,
        };
        resolve(createdUser);
      },
    );

    toCloseDB(db);
  });
};

export const getUsers = (): Promise<IUser[]> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.all(
      `SELECT * FROM users`,
      [],
      function (err: Error | null, rows: IUser[]) {
        if (err) reject(err.message);

        console.log(rows);
        resolve(rows);
      },
    );

    toCloseDB(db);
  });
};

export const getUserById = (id: Pick<IUser, "id">): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.get(
      `SELECT * FROM users WHERE id = ?`,
      [id],
      (err: Error | null, row: IUser) => {
        if (err) reject(err.message);

        resolve(row);
      },
    );
    toCloseDB(db);
  });
};

export const getUserByName = (name: string): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.get(
      `SELECT * FROM users WHERE name = ?`,
      [name],
      (err: Error | null, row: IUser) => {
        if (err) reject(err.message);

        resolve(row);
      },
    );

    toCloseDB(db);
  });
};

export const deleteUser = (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `DELETE FROM users WHERE id = ?`,
      [id],
      function (err: Error | null) {
        if (err) reject(err.message);

        resolve("OK");
      },
    );

    toCloseDB(db);
  });
};

export const updateUser = ({
  name,
  email,
  role,
  token,
  id,
}: Partial<IUser>): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), role = COALESCE(?, role), token = COALESCE(?, token) WHERE id = ?`,
      [name, email, role, token, id],
      function (err: Error | null) {
        if (err) reject(err.message);

        db.get(
          `SELECT * FROM users WHERE id = ?`,
          [id],
          function (err: Error | null, row: IUser) {
            if (err) reject(err.message);

            resolve(row);
          },
        );
      },
    );

    toCloseDB(db);
  });
};

export const updatePass = async ({
  password,
  id,
}: Pick<IUser, "id" | "password">): Promise<IUser> => {
  const hashedPass = await hashPassword(password);
  return new Promise((resolve, reject) => {
    const db = toConnectDB();

    db.run(
      `UPDATE users SET password = COALESCE(?, password) WHERE id = ?`,
      [hashedPass, id],
      function (err: Error | null) {
        if (err) reject(err.message);

        db.get(
          `SELECT * FROM users WHERE id = ?`,
          [id],
          function (err: Error | null, row: IUser) {
            if (err) reject(err.message);

            resolve(row);
          },
        );
      },
    );

    toCloseDB(db);
  });
};
