import express from 'express';
import { ResumeController } from '../src/controllers/resume.controller.js';
import { prisma } from '../models/index.js';
import { validateAccessToken } from '../middlewares/middleweare.js'
import { ResumeService } from '../src/services/resume.service.js';
import { ResumeRepository } from '../src/repositories/resume.repository.js';

const router = express.Router();
const resumesRepository = new ResumeRepository(prisma);
const resumesService = new ResumeService(resumesRepository)
const resumesController = new ResumeController(resumesService);

// 이력서 작성
router.post('/', validateAccessToken, resumesController.createResume);

// 이력서 전체 조회
router.get('/', resumesController.findAllResumes);

// 이력서 상세조회
router.get('/:resumeId', resumesController.findResume);

// 이력서 수정하기
router.put('/:resumeId',validateAccessToken, resumesController.changeResume);

// 이력서 삭제하기
router.delete('/:resumeId',validateAccessToken, resumesController.deleteResume);


export default router;