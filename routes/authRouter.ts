import express from "express";
import { register, login } from "../controller/authController";

const Router = express.Router();

Router.post("/register",register)
// Router.get("/login",)
Router.post("/login", login);

export default Router;