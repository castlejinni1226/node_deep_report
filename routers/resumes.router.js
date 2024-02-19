import express from 'express';
import { resumeController } from '../src/controllers/resume.controller.js';
import { validateAccessToken } from '../middlewares/middleweare.js'

const router = express.Router();

const resumesController = new resumeController();

/** 게시글 작성 API **/
router.post('/resume', validateAccessToken, resumesController.createResume);

export default router;