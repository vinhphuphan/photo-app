import { PrismaClient } from '@prisma/client';
import { responseData } from "../config/config.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken, decodeToken } from "../config/jwt.js";
import axios from 'axios';

const prisma = new PrismaClient();

// Sign up
export const signUp = async (req, res) => {

    const { full_name, email, password, birthdate } = req.body;

    const [year, month, day] = birthdate.split('-');

    try {
        const userExists = await prisma.users.findUnique({ where: { email } });

        if (userExists) {
            return responseData(res, "Email already exists", 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            hashed_password: hashedPassword,
            full_name,
            birthdate: new Date(`${year}-${month}-${day}`),
        };

        await prisma.users.create({ data: newUser });
        return responseData(res, "Sign up successfully", 201, newUser);
    } catch (err) {
        console.error("Error signing up:", err);
        return responseData(res, "System Error", 500);
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) {
            return responseData(res, "Incorrect email", 400);
        }

        if (!bcrypt.compareSync(password, user.hashed_password)) {
            return responseData(res, "Incorrect password", 400);
        }

        const token = createAccessToken({
            user_id: user.user_id,
        });

        const userInfo = {
            email : user.email, 
            full_name : user.full_name,
            avatar : user.avatar,
            birthdate : user.birthdate
        }

        const refreshToken = createRefreshToken({
            user_id: user.user_id
        });

        // Update refresh token in the database
        await prisma.users.update({
            where: { user_id: user.user_id },
            data: { refresh_token: refreshToken }
        });

        return responseData(res, "Login successfully!", 200, { user : userInfo, token : token});
    } catch (err) {
        console.error("Error logging in:", err);
        return responseData(res, "System Error", 500);
    }
};

// Function for logging in with Google
export const loginWithGoogle = async (req, res) => {
    // Extract user information from request body
    const { sub, name, picture } = req.body.data;
    
    try {
        let token = "";
        // Check if a user with the provided sub_google_id exists in the database
        let checkUser = await prisma.users.findUnique({ where: { sub_google_id: sub } });

        if (checkUser) {
            // If the user exists, generate an access token
            token = createAccessToken({ user_id: checkUser.user_id, full_name: checkUser.full_name });
        } else {
            // If the user doesn't exist, create a new user record
            const newUser = {
                full_name: name,
                email: "", 
                sub_google_id: sub,
                hashed_password: "", // Assuming you're not using password-based authentication for Google users
                avatar: picture
            };

            // Create a new user record in the database
            const createdUser = await prisma.users.create({ data: newUser });

            // Generate a refresh token for the newly created user
            const refreshToken = createRefreshToken({ user_id: createdUser.user_id });

            // Generate an access token
            token = createAccessToken({ user_id: createdUser.user_id, full_name: name , avatar : picture });

            // Update the user record with the refresh token
            await prisma.users.update({
                where: { user_id: createdUser.user_id },
                data: { refresh_token: refreshToken }
            });
        }

        // Return success response with access token
        return responseData(res, "Login with Google successful!", 200,  { user : checkUser || newUser, token : token});
    } catch (error) {
        // Handle errors
        console.error("Error logging in with Google", error);
        return responseData(res, "Error logging in with Google", 500);
    }
};

// Get users
export const getUsersList = async (req, res) => {
    try {
        const data = await prisma.users.findMany();
        return responseData(res, "Get list of users successfully", 200, data);
    } catch (err) {
        console.error("Error fetching users:", err);
        return responseData(res, "System Error", 500);
    }
};

// Get users by id
export const getUserInfoByToken = async (req, res) => {
    const { token } = req.headers
    const { user_id } = decodeToken(token)
    try {
        const data = await prisma.users.findUnique({ where : {user_id} });
        return responseData(res, "Get user by id successfully", 200, data);
    } catch (err) {
        console.error("Error fetching user by id:", err);
        return responseData(res, "System Error", 500);
    }
};


// Upload user info by token
export const uploadUserInfo = async (req, res) => {

    const { 
        name, 
        surname, 
        introduce, 
        website, 
        user_name,
        photo_path
     } = req.body;

    const { token } = req.headers
    const { user_id } = decodeToken(token)
    try {
        let user = await prisma.users.findUnique({ where : {user_id} });
        if (!user) {
            return responseData(res, "User not found", 404);
        }

        // Combine name and surname into full_name
        const full_name = `${surname} ${name}`;

        // Update user's avatar path
        user = await prisma.users.update({
            where: { user_id },
            data: { 
                full_name,
                introduce,
                website,
                user_name,
                avatar: photo_path
             }
        });

        return responseData(res, "Upload user info by token successfully", 200, "");
    } catch (err) {
        console.error("Error uploading user info by token : ", err);
        return responseData(res, "System Error", 500);
    }
};