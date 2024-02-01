import express from 'express';
import { prisma } from '../models/index.js'

const router = express.Router();

router.post('/sign-up', async (req,res,next) => {
    const {email, password, checkpassword, name} = req.body;

    const isExistUser = await prisma.Users.findFirst({where : {email}});
    if (isExistUser) {
        return res.status(409).json({message : "이미 존재하는 이메일입니다."});
    }

    const user = await prisma.Users.create({
        data: {
            email,
            password,
            checkpassword,
            name
        }
    });

    return res.status(201).json({email, name});

})

export default router;