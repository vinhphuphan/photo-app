import { PrismaClient } from "@prisma/client";
import { responseData } from "../config/config.js";
import { decodeToken } from "../config/jwt.js";

const prisma = new PrismaClient();

// Get comments by photo_id
export const getCommentsByPhotoId = async (req, res) => {

    const { photo_id } = req.params;

    try {
        const data = await prisma.comments.findMany({ where: { photo_id } });
        return responseData(res, `Get comments by photo_id ${photo_id} successfully`, 200, data);
    } catch (err) {
        console.error("Error fetching comments by photo_id : ", err);
        return responseData(res, "System Error", 500);
    }
};

// Create comment by user_id and photo_id
export const createComment = async (req, res) => {
     // Extract photo_id and content from request body
    const { photo_id, content } = req.body

     // Extract token from request headers
    const { token } = req.headers

    
    try {
        // Decode token to extract user_id
        const { user_id } = decodeToken(token)

        // Validate input data
        if (!photo_id || !content) {
            return responseData(res, "Missing required fields", 400);
        }
        
        let newComment = {
            user_id,
            photo_id,
            comment_date: new Date(),
            content
        }

        await prisma.comments.create({ data: newComment })

        return responseData(res, `Create comments successfully`, 201, newComment);
    } catch (err) {
        console.error("Error creating comments : ", err);
        return responseData(res, "System Error", 500);
    }
} 