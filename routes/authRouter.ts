import express from "express";
import { register } from "../controller/authController";

const Router = express.Router();

Router.post("/register",register)
// Router.get("/login",)

export default Router;