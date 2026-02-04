import User from "../models/User.js";

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (user) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                agentId: user.agentId,
            });
        } else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        next(error);
    }
};