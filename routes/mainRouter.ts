import express from "express";
import authRouter from "./authRouter"

const Router = express.Router();

Router.get("/auth",authRouter)