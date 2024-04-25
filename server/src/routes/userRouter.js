import express from "express"
import { getUserInfoByToken, getUsersList, login, loginWithGoogle, signUp, uploadUserInfo } from "../controllers/userController.js";

const userRouter = express();

userRouter.get("/", getUsersList);
userRouter.get("/by-token", getUserInfoByToken);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/google", loginWithGoogle);
userRouter.post("/upload-info", uploadUserInfo)

export default userRouter;