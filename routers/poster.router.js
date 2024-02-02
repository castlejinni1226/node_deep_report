import express from 'express';
import { prisma } from '../models/index.js'
import { createAccessToken, validateAccessToken, validateToken } from "../middlewares/middleweare.js";

const router = express.Router();

router.get('/posts', async (req, res, next) => {
    const posts = await prisma.Posters.findMany({
        select: {
            posterId: true,
            title: true,
            content: true,
            author: true,
            status: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return res.status(200).json({ data: posts });
});

router.get('/posts/:postId', async (req, res, next) => {
    const { postId } = req.params;
    const post = await prisma.Posters.findFirst({
        where : { posterId : +postId },
        select : {
            posterId : true,
            userId :true,
            title :true,
            content :true,
            author : true,
            status :true,
            createdAt :true
        },
    });

    if (!post) {
        return res.status(404).json({ message: "이력서 조회에 실패하였습니다." })
    };

    return res.status(200).json({ data : post})
})

router.post('/postcreate', async (req, res, next) => {
    if (validateAccessToken(req, res)) {
        return;
    }

    const accesstoken = req.cookies.accessToken;
    const Id = validateToken(
        accesstoken,
        process.env.ACCESS_TOKEN_SECRET_KEY,
    )

    const { title, content } = req.body;

    const user = await prisma.Users.findFirst({ where: { userId: +Id.id } })

    const post = await prisma.Posters.create({
        data: {
            userId: +Id.id,
            title,
            content,
            author: user.name
        },
    });

    return res.status(201).json({ data: post });
});

router.put('/posts/:postId', async (req, res, next) => {
    if (validateAccessToken(req, res)) {
        return;
    }

    const {postId} = req.params;
    const { title, content, status } = req.body;

    const Id = await prisma.Posters.findFirst({where : {posterId : +postId}});

    if (!Id) {
        return res.status(404).json({ message: "해당 이력서가 존재하지 않습니다." })
    };

    const poster = await prisma.Posters.update({
        where: Id,
        select: {
            posterId: true,
            userId: true,
            title: true,
            content: true,
            author: true,
            status: true,
            createdAt: true,
            updatedAt: true
        },
        data: {
            title: title,
            content: content,
            status: status
        }
    });
    return res.status(201).json({ data: poster });
})

router.delete('/postDelete/:postId', async(req, res, next) => {
    if (validateAccessToken(req, res)) {
        return;
    }

    const { postId } = req.params;

    const post = await prisma.Posters.findFirst({
        where : {
            posterId : +postId,
        }
    });

    if (!post) {
        return res.status(404).json({message : "이력서 조회에 실패하였습니다." });
    }

    await prisma.Posters.delete({
        where: {
            posterId: +postId
        }
    });

    return res.status(200).json({ message: "이력서가 삭제되었습니다."});
});

export default router;