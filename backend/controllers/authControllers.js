import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { sendWelcomeEmail } from "../utils/sendMail.js";

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