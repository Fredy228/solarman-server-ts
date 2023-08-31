const bcrypt = require("bcrypt");

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const checkPassword = (
  candidate: string,
  hash: string,
): Promise<boolean> => bcrypt.compare(candidate, hash);
