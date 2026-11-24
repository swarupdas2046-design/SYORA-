import authModel from "../models/auth.model.js";
import ApiError from "../utils/apiError.js";
import { generateToken } from "../utils/token.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerService = async ({ name, email, password }) => {
    if(!name || !email || !password) throw new ApiError("Please provide all fields", 400);

    if(!emailRegex.test(email)) throw new ApiError("Please provide a valid email", 400);

    if(password.length < 6) throw new ApiError("Password must be at least 6 characters", 400);

    const isUserExist = await authModel.findOne({
        $or:[
            { name },
            { email }
        ]
    });

    if(isUserExist) throw new ApiError("User already exists", 400);

    const newUser = await authModel.create({ name, email, password });

    const token = generateToken(newUser._id, newUser.name);

    return { newUser, token };
}


export const loginService = async ({ email, password,name }) => {
    if(!email || !password) throw new ApiError("Please provide all fields", 400);

    if(!emailRegex.test(email)) throw new ApiError("Please provide a valid email", 400);

    if(password.length < 6) throw new ApiError("Password must be at least 6 characters", 400);

    const user = await authModel.findOne({ 
        $or:[
            { email },
            { name }
        ]
    });

    if(!user) throw new ApiError("Invalid credentials", 404);

    if(!user.comparePassword(password)) throw new ApiError("Invalid credentials", 400);

    const token = generateToken(user._id, user.name);

    return { user, token };
}

