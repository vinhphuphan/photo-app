import express from "express"
import { createComment, getCommentsByPhotoId } from "../controllers/commentController.js";

const commentRouter = express()

commentRouter.get("/:photo_id" , getCommentsByPhotoId)
commentRouter.post("/", createComment)

export default commentRouter;