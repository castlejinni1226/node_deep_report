import { resumeRepository } from '../repositories/resume.repository.js'

export class resumeService {
    resumesRepository = new resumeRepository();

    createResume = async (title, content, userId, name) => {

        const createResume = await this.resumesRepository.createResume(
            title,
            content,
            userId,
            name
        );

        return createResume;
    }
    findAllResumes = async() => {
        const resumes = await this.resumesRepository.findAllResumes();

        return resumes;
    };

    findResume = async(resumeId) => {
        const resume = await this.resumesRepository.findResume(resumeId);

        return resume;
    };

    changeResume = async(userId, resumeId, title, content, status) => {
        const changeResume = await this.resumesRepository.changeResume(
            userId,
            resumeId,
            title,
            content,
            status
        );

        return changeResume;
    };

    deleteResume = async (resumeId, userId) => {

        const resume = await this.resumesRepository.findResume(resumeId);
        if (!resume) {
            throw new Error('해당하는 이력서가 존재하지 않습니다.');
        }

        const deleteResume = await this.resumesRepository.deleteResume(
            resumeId,
            userId
        )
        
        return deleteResume;
    }


}