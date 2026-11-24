import { loginService, registerService } from "../services/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const userData = (user)=>{
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

export const registerController = asyncHandler(async (req, res) => {
    const { newUser , token} = await registerService(req.body);

    res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json(new ApiResponse("User registered successfully", userData(newUser)));

});

export const loginController = asyncHandler(async (req, res) => {
    const { user , token} = await loginService(req.body);

    res.cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(200).json(new ApiResponse("User logged in successfully", userData(user)));
});