import express from "express";
import authRouter from "./authRouter"

const Router = express.Router();

Router.use("/auth",authRouter)

export default Router;