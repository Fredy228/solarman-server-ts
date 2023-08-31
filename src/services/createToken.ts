const jwt = require("jsonwebtoken");
require("dotenv").config();

export const singToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
