import { type Response, type Request, response } from "express";
import type { ErrorResponse, SuccessResponse } from "../types/apiRsponse";
import { prisma } from "../utils/prismaClient";
import bcrypt from "bcrypt"

export const register = async (
  req: Request,
  res: Response<ErrorResponse | SuccessResponse<any>>
) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId:role
      }
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
