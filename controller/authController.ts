import { type Response, type Request, response } from "express";
import type { ErrorResponse, SuccessResponse } from "../types/apiRsponse";
import { prisma } from "../utils/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSelector } from "../prisma/selectors/auth";
import type { registerRequestDto } from "../dto/auth.dto";
import { createUser } from "../services/auth.services";


export const register = async (
  req: Request,
  res: Response<ErrorResponse | SuccessResponse<any>>,
) => {
  try {
    const { name, email, password, role }:registerRequestDto = req.body;

    const user = await createUser(name, email, role, password);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error:any) {
    console.error("REGISTER ERROR:", error);

    if(error.message == "USER_EXISTS"){
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

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
