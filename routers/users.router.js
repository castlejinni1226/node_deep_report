import express from 'express';
import { prisma } from '../models/index.js'
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/sign-up', async (req,res,next) => {
    const {email, password, checkpassword, name} = req.body;

    const isExistUser = await prisma.Users.findFirst({where : {email}});
    if (isExistUser) {
        return res.status(409).json({message : "이미 존재하는 이메일입니다."});
    }

    if ( password.length < 6) {
        return res.status(401).json({message : "비밀번호는 6자리 이상이어야합니다."})
    }

    if ( password !== checkpassword) {
        return res.status(401).json({message : "비밀번호가 일치하지 않습니다."})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedcheckPassword = await bcrypt.hash(checkpassword, 10);

    const user = await prisma.Users.create({
        data: {
            email,
            password: hashedPassword,
            checkpassword : hashedcheckPassword,
            name
        }
    });

    return res.status(201).json({email, name});

})

export default router;