import { prisma } from '../../models/index.js'

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
}