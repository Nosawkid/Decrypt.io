import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;

    // 1. Check if the "Authorization" header exists and starts with "Bearer"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            // 2. Get the token from the header (remove "Bearer " string)
            token = req.headers.authorization.split(" ")[1];

            // 3. Verify the token signature
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 4. Find the user in DB (and exclude the password)
            // This allows you to use `req.user.agentId` in any protected route!
            req.user = await User.findById(decoded.userId).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            next(); // Pass control to the next middleware/controller
        } catch (error) {
            console.error(error);
            res.status(401);
            next(new Error("Not authorized, token failed"));
        }
    }

    if (!token) {
        res.status(401);
        next(new Error("Not authorized, no token"));
    }
};