import { createAccessToken } from "../../middlewares/middleweare.js";

export class UsersController {
    constructor(userService) {
        this.userService = userService;
    }

    // 회원가입
    createUser = async (req, res, next) => {
        try {
            const { email, password, checkpassword, name } = req.body;
            const createUser = await this.userService.createUser(
                email,
                password,
                checkpassword,
                name
            );

            return res.status(201).json({ data: createUser });

        } catch (err) {
            next(err);
        }
    }

    // 로그인
    loginUser = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await this.userService.loginUser(
                email,
                password
            );

            if (createAccessToken(res, user.userId)) {
                return res.status(401).json({ message: "ACCESS Token을 발급받지 못했습니다." });
            }

            return res.status(200).json({ message: "로그인 성공" });
        } catch (err) {
            next(err);
        }
    }

    // 회원정보 조회
    findUser = async (req, res, next) => {
        try {
            const { userId } = req.user;

            const user = await this.userService.findUser(userId);

            return res.status(200).json({ data: user });
        } catch (err) {
            next(err);
        }
    }
}