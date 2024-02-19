import { resumeService } from '../services/resume.service.js'

export class resumeController {
    resumesService = new resumeService();

    createResume = async (req, res, next) => {
        try {
            const { title, content } = req.body;
            const { userId, name} = req.user

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

}