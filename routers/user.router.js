import express from "express";
import { UsersController } from '../src/controllers/user.controller.js'
import { validateAccessToken } from "../middlewares/middleweare.js";
import { UsersRepository } from "../src/repositories/user.repository.js";
import { UsersService } from "../src/services/user.service.js";
import { prisma } from "../models/index.js";

const router = express.Router();
const usersRepository = new UsersRepository(prisma);
const userService = new UsersService(usersRepository);
const userController = new UsersController(userService);

// 회원가입 
router.post("/sign-up",userController.createUser);

// 로그인
router.post("/sign-in", userController.loginUser)

// 회원정보 조회
router.get("/",validateAccessToken,userController.findUser)

export default router;