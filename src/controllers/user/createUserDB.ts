import { toConnectDB } from "./userDB.service";

function createUserDB() {
  const db = toConnectDB();

  db.get(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
    (err, result) => {
      if (err) {
        console.error(err.message);
      }
      if (!result) {
        // Таблицы не существует, создаем ее
        db.run(
          "CREATE TABLE users (id TEXT, name TEXT, email TEXT, role TEXT, password TEXT, token TEXT)",
          (err) => {
            if (err) {
              console.error(err.message);
            }
            console.log("Таблица users создана.");
          },
        );
      } else {
        console.log("Таблица users уже существует.");
      }
    },
  );
}

createUserDB();
