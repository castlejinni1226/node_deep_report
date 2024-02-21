import { prisma } from '../../models/index.js'
import { resumeService } from '../services/resume.service.js';

export class resumeRepository {

    createResume = async (title, content, userId, name) => {

        const resume = await prisma.Resumes.create({
            data: {
                title: title,
                content: content,
                userId: userId,
                author: name
            }
        });
        return resume;
    }
    findAllResumes = async () => {

        const resumes = await prisma.Resumes.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return resumes;
    };

    findResume = async(resumeId) => {
        const resume = await prisma.Resumes.findFirst({
            where: { resumeId : +resumeId }
        });
        return resume;
    }

    changeResume = async(userId, resumeId, title, content, status) => {
        const changeResume = await prisma.Resumes.update({
            where: {resumeId: +resumeId},
            data: {
                userId : userId,
                resumeId : +resumeId,
                title: title,
                content: content,
                status: status
            }
        });
        return changeResume;
    }

    deleteResume = async ( resumeId, userId ) => {
        const deleteResume = await prisma.Resumes.delete({
            where : { 
                resumeId : +resumeId,
                userId: +userId
            }
        });
        return deleteResume;
    }
}