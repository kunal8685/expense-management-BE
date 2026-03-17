import { type Response, type Request, response } from "express";
import type { ErrorResponse, SuccessResponse } from "../types/apiRsponse";
import { prisma } from "../utils/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (
  req: Request,
  res: Response<ErrorResponse | SuccessResponse<any>>,
) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: role,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (
  req: Request,
  res: Response<ErrorResponse | SuccessResponse<any>>,
) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        roleId: user.roleId,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: { id:user.id,email: user.email, name: user.name, role: user.roleId },
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
