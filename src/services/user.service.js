import bcrypt from "bcrypt";

export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    createUser = async (email, password, checkpassword, name) => {

        if ( !email ) {
            throw new Error('이메일을 입력하셔야하옵니다.');
        } else if (!password) {
            throw new Error('비밀번호를 입력하세요');
        } else if (!checkpassword) {
            throw new Error('비밀번호확인을 치세요;');
        } else if (!name) {
            throw new Error('이름을 입력하셔야죠;;');
        }

        const checkEmail = await this.usersRepository.checkEmail(email);
        if (checkEmail) {
            throw new Error('이메일이 중복이어유');
        }

        if ( password.length < 6 ) {
            throw new Error('비밀번호는 6자리 이상이어야해');
        }

        if (password !== checkpassword ) {
            throw new Error('비밀번호랑 비밀번호확인이 일치하지 않습니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await this.usersRepository.createUser(
            email,
            hashedPassword,
            name
        );
        
        return createUser;
    }

    loginUser = async (email, password) => {

        if ( !email ) {
            throw new Error('이메일을 입력하셔야하옵니다.');
        } else if (!password) {
            throw new Error('비밀번호를 입력하세요');
        }

        const user = await this.usersRepository.checkEmail(email);

        if (!user) {
            throw new Error("존재하지 않는 이메일입니다.");
        } else if (!(await bcrypt.compare(password, user.password))) {
            throw new Error("비밀번호가 일치하지 않습니다.");
        }
        
        return user;
    }

    findUser = async (userId) => {

        const user = await this.usersRepository.checkUserId(userId);

        return {
            userId: user.userId,
            email: user.email,
            name: user.name
        };
    }
}