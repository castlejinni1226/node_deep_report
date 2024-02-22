export class ResumeService {
    constructor(resumesRepository) {
        this.resumesRepository = resumesRepository;
    }

    createResume = async (title, content, userId, name) => {

        if ( !title ) {
            throw new Error('제목을 입력하셔야하옵니다.');
        } else if (!content) {
            throw new Error('내용을 입력하세요');
        }

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

        if (!resumes) {
            throw new Error('이력서가 존재하지 않습니다.');
        }

        return resumes;
    };

    findResume = async(resumeId) => {
        const resume = await this.resumesRepository.findResume(resumeId);

        if (!resume) {
            throw new Error('이력서가 존재하지 않습니다.');
        }

        return resume;
    };

    changeResume = async(userId, resumeId, title, content, status) => {

        if ( !title ) {
            throw new Error('제목을 입력하셔야하옵니다.');
        } else if (!content) {
            throw new Error('내용을 입력하세요');
        } else if (!status) {
            throw new Error('상태를 입력하세요;');
        }

        const checkResume = await this.resumesRepository.findResume(resumeId);

        if(!checkResume) {
            throw new Error ('해당하는 이력서가 존재하지 않습니다.')
        } else if (checkResume.userId !== userId) {
            throw new Error ('수정할 수 있는 권한이 없습니다.')
        }

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

        const checkResume = await this.resumesRepository.findResume(resumeId);
        if (!checkResume) {
            throw new Error('해당하는 이력서가 존재하지 않습니다.');
        }

        if(!checkResume) {
            throw new Error ('해당하는 이력서가 존재하지 않습니다.')
        } else if (checkResume.userId !== userId) {
            throw new Error ('수정할 수 있는 권한이 없습니다.')
        }

        const deleteResume = await this.resumesRepository.deleteResume(
            resumeId,
            userId
        )
        
        return deleteResume;
    }


}