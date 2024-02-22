export class UsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    createUser = async (email, hashedPassword, name) => {

        const user = await this.prisma.Users.create({
            data: {
                email,
                password: hashedPassword,
                name
            }
        });
        return user;
    }

    checkEmail = async (email) => {

        const checkEmail = await this.prisma.Users.findFirst({where: {email}});

        return checkEmail;
    }

    checkUserId = async (userId) => {

        const user = await this.prisma.Users.findFirst({where: {userId}});

        return user;
    }
}