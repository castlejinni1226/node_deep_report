export class ResumeController {
    constructor(resumesService) {
        this.resumesService = resumesService;
    }
    
    // 이력서 작성
    createResume = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const { userId, name} = req.user;

            const createResume = await this.resumesService.createResume(
                title,
                content,
                userId,
                name
            );

            return res.status(201).json({ data: createResume });

        } catch(err) {
            next(err);
        }
    }
    // 이력서 전체조회
    findAllResumes = async (req, res, next) => {
        try {
            const resumes = await this.resumesService.findAllResumes();

            return res.status(200).json({ data: resumes });

        } catch(err) {
            next(err);
        }
    }

    // 이력서 상세조회
    findResume = async (req, res, next) => {
        try {
            const { resumeId } = req.params;

            const resume = await this.resumesService.findResume(resumeId);

            return res.status(200).json({ data: resume });

        } catch(err) {
            next(err);
        }
    }

    // 이력서 수정하기 
    changeResume = async ( req, res, next) => {
        try {
            const { resumeId } = req.params;
            const { title, content, status } = req.body;
            const { userId } = req.user;

            const changeResume = await this.resumesService.changeResume(
                userId,
                resumeId,
                title,
                content,
                status
            );

            return res.status(201).json({ data: changeResume });

        } catch(err) {
            next(err);
        }
    }

    // 이력서 삭제하기
    deleteResume = async (req, res, next) => {
        try {
            const { resumeId } = req.params;
            const { userId } = req.user;
            const deleteResume = await this.resumesService.deleteResume(
                resumeId,
                userId
            )

            return res.status(200).json({ data: deleteResume});
        }

        catch(err) {
            next(err);
        }
    }
}