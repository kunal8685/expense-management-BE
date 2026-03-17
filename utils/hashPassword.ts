import bcrypt from "bcrypt";

export const hashPasssword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
