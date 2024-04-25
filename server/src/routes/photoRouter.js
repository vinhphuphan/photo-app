import express from "express"
import {  checkSave, deletePhoto, getPhotoById, getPhotoSavedByUser, getPhotos, getPhotosCreatedByUser, savePhoto, searchPhotos, uploadPhoto } from "../controllers/photoController.js";

const photoRouter = express()

photoRouter.get("/" , getPhotos);
photoRouter.get("/search/:query" , searchPhotos)
photoRouter.get("/by-photo-id/:id" , getPhotoById)
photoRouter.get("/created-by-user-id" , getPhotosCreatedByUser)
photoRouter.get("/saved-by-user-id" , getPhotoSavedByUser)
photoRouter.get("/check-save", checkSave)
photoRouter.post("/upload", uploadPhoto)
photoRouter.post("/save-photo", savePhoto)
photoRouter.delete("/:photo_id" , deletePhoto)

export default photoRouter;