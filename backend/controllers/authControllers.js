import User from "../models/User.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { sendWelcomeEmail } from "../utils/sendMail.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body
    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
        res.status(400)
        return next(new Error("Username or Email is already associated with a user"))
    }

    let agentId
    let isUnique = false
    const joinedUsername = username.split(" ").join("")

    while (!isUnique) {
        const randomSuffix = crypto.randomBytes(3).toString("hex").slice(0, 3)
        agentId = `${joinedUsername.toLowerCase()}_${randomSuffix}@decrypt.io`
        const duplicated = await User.findOne({ agentId })
        if (!duplicated) {
            isUnique = true
        }
    }



    const newUser = new User({
        username,
        email,
        password,
        agentId
    })

    await newUser.save()
    try {
        await sendWelcomeEmail(email, username, agentId)
    } catch (error) {
        console.log(error)
        res.status(400)
        return next(new Error("Sending email failed"))
    }
    res.status(201).json({ message: "User Registration Success", requestSucceeded: true, newUser })

}

export const loginUser = async (req, res, next) => {
    const { agentId, password } = req.body
    const agent = await User.findOne({ agentId })
    if (!agent) {
        return next(new Error("User not found"))
    }
    const isMatchingPassword = await bcrypt.compare(password, agent.password)
    if (!isMatchingPassword) {
        return next(new Error("Invalid Password"))
    }

    const accessToken = jwt.sign({
        userId: agent._id,
        agentId: agent.agentId
    }, process.env.JWT_SECRET, {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign(
        { userId: agent._id },
        process.env.JWT_REFRESH_SECRET, // Make sure this is in your .env
        { expiresIn: "7d" }
    );

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60
    })

    res.status(200).json({
        message: "Login Successful", accessToken, agent: {
            _id: agent._id,
            username: agent.username,
            agentId: agent.agentId,
            email: agent.email,
        },
    })
}




export const refreshToken = async (req, res, next) => {
    try {
        // 1. Get the cookie
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            res.status(401);
            return next(new Error("Unauthorized: No Refresh Token"));
        }

        const refreshToken = cookies.jwt;

        // 2. Verify the token
        jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET,
            async (err, decoded) => {
                if (err) {
                    res.status(403); // Forbidden (Token expired or invalid)
                    return next(new Error("Forbidden: Invalid Refresh Token"));
                }

                // 3. Check if user still exists (Optional but recommended)
                const foundUser = await User.findById(decoded.userId);
                if (!foundUser) {
                    res.status(401);
                    return next(new Error("Unauthorized: User not found"));
                }

                // 4. Generate NEW Access Token
                const accessToken = jwt.sign(
                    { userId: foundUser._id, agentId: foundUser.agentId },
                    process.env.JWT_SECRET,
                    { expiresIn: "15m" }
                );

                // 5. Send new token
                res.json({ accessToken });
            }
        );
    } catch (error) {
        next(error);
    }
};

// --- LOGOUT (Bonus: You need this to clear the cookie) ---
export const logoutUser = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.json({ message: "Cookie cleared" });
};