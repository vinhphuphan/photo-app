import express from "express"
import userRouter from "./userRouter.js";
import photoRouter from "./photoRouter.js";
import commentRouter from "./commentRouter.js";

const rootRouter = express()

rootRouter.use("/users", userRouter)
rootRouter.use("/photos", photoRouter)
rootRouter.use("/comments", commentRouter)

export default rootRouter;