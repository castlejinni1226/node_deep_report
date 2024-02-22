export class ResumeRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    createResume = async (title, content, userId, name) => {

        const resume = await this.prisma.Resumes.create({
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

        const resumes = await this.prisma.Resumes.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return resumes;
    };

    findResume = async(resumeId) => {
        const resume = await this.prisma.Resumes.findFirst({
            where: { resumeId : +resumeId }
        });
        return resume;
    }

    changeResume = async(userId, resumeId, title, content, status) => {
        const changeResume = await this.prisma.Resumes.update({
            where: {
                resumeId: +resumeId,
                userId: +userId
            },
            data: {
                title: title,
                content: content,
                status: status
            }
        });
        return changeResume;
    }

    deleteResume = async ( resumeId, userId ) => {
        const deleteResume = await this.prisma.Resumes.delete({
            where : { 
                resumeId : +resumeId,
                userId: +userId
            }
        });

        return deleteResume;
    }
}