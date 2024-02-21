import express from "express";
import { usersController } from '../src/controllers/user.controller.js'
import { validateAccessToken } from "../middlewares/middleweare.js";

const router = express.Router();
const userController = new usersController();

router.post("/sign-up",validateAccessToken,userController.signup)

export default router;