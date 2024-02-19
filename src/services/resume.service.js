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
}