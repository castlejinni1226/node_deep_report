import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routers/user.router.js";
import ResumeRouter from "./routers/resumes.router.js";

const app = express();
const PORT = 3018;

app.use(express.json());
app.use(cookieParser());
app.use('/resumes', ResumeRouter);
app.use('/users', UserRouter);

app.listen(PORT, () => {
  console.log(PORT, "포트로 서버가 열렸어요!");
});
