import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { prisma } from "../models/index.js";
dotenv.config();

function createAccessToken (res, id) {

    const accessToken = jwt.sign(
        {id : id},
        process.env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn : '12h'},
    );

    res.cookie('accessToken', accessToken);
}

function validateAccessToken (req,res) {

    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(400).json({message : "Access Token이 존재하지 않습니다."});
    }

    const payload = validateToken(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!payload) {
        return res.status(401).json({message : "Access Token이 유효하지 않습니다."});
    }

}

function validateToken(token, secretkey) {
    try {
        const payload = jwt.verify(token, secretkey);
        return payload;
    } catch (error) {
        return null;
    }
}

export {createAccessToken, validateAccessToken, validateToken};