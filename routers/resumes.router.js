import express from 'express';
import { resumeController } from '../src/controllers/resume.controller.js';
import { validateAccessToken } from '../middlewares/middleweare.js'

const router = express.Router();
const resumesController = new resumeController();

// 이력서 작성
router.post('/resume', validateAccessToken, resumesController.createResume);

// 이력서 전체 조회
router.get('/resumes', resumesController.findAllResumes);

// 이력서 상세조회
router.get('/resume/:resumeId', resumesController.findResume);

// 이력서 수정하기
router.put('/resume/:resumeId',validateAccessToken, resumesController.changeResume);

// 이력서 삭제하기
router.delete('/resume/:resumeId',validateAccessToken, resumesController.deleteResume);


export default router;