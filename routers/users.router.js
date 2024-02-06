import express from "express";
import { prisma } from "../models/index.js";
import bcrypt from "bcrypt";
import { createAccessToken, validateAccessToken, validateToken } from "../middlewares/middleweare.js";

const router = express.Router();

router.post("/sign-up", async (req, res, next) => {
    const { email, password, checkpassword, name } = req.body;

    const isExistUser = await prisma.Users.findFirst({ where: { email } });
    if (isExistUser) {
        return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    if (password.length < 6) {
        return res
            .status(401)
            .json({ message: "비밀번호는 6자리 이상이어야합니다." });
    }

    if (password !== checkpassword) {
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.Users.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    return res.status(201).json({ email, name });
});

router.post("/sign-in", async (req, res, next) => {
    const { email, password } = req.body;
    const user = await prisma.Users.findFirst({ where: { email } });

    if (!user)
        return res.status(401).json({ message: "존재하지 않는 이메일입니다." });
    else if (!(await bcrypt.compare(password, user.password)))
        return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });

    if (createAccessToken(res, user.userId)) {
        return res.status(401).json({ message: "ACCESS Token을 발급받지 못했습니다." });
    }

    return res.status(200).json({ message: "로그인 성공" });
});

router.get("/users", async (req, res, next) => {

    if (validateAccessToken(req, res)) {
        return;
    }

    const accesstoken = req.cookies.accessToken;
    const Id = validateToken(
        accesstoken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
    )

    const user = await prisma.Users.findFirst({
        where: { userId: +Id.id },
        select: {
            userId: true,
            email: true,
            name: true,
        },
    });

    return res.status(200).json({ data: user });
});

export default router;
