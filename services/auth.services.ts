import type { User } from "../generated/prisma/client";
import { findUserByEmail } from "../repositories/auth.repo";
import { hashPasssword } from "../utils/hashPassword";
import { createUserRepo } from "../repositories/auth.repo";
 
export const createUser = async (
  email: string,
  name: string,
  role: number,
  password: string,
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("USER_EXISTS");
  }

  const hashedPassword = await hashPasssword(password);

  const user = await createUserRepo({name, email, password:hashedPassword, role});

  return user;
};
