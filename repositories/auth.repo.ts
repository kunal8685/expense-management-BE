import type { registerRequestDto } from "../dto/auth.dto";
import { userSelector } from "../prisma/selectors/auth";
import { prisma } from "../utils/prismaClient";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUserRepo = async ({
  name,
  email,
  password,
  role,
}: registerRequestDto) => {
  await prisma.user.create({
    data: {
      name,
      email,
      password,
      roleId: role,
    },
    select: userSelector,
  });
};
